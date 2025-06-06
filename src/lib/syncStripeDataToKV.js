import { getRedisClient } from "./redis";
import { stripe } from "@/lib/stripe";
import { PrismaClient } from "../../generated/prisma";
import { headers } from "next/headers";
import { auth } from "./auth";

const prisma = new PrismaClient();

export async function syncStripeDataToKV(stripeCustomerId) {
  // Get the session to access user ID
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    throw new Error("No authenticated user found in session");
  }

  const userId = session.user.id;

  // Ensure we have a customer ID
  if (!stripeCustomerId) {
    throw new Error("stripeCustomerId is required");
  }

  // Ensure it's a string
  const customerId = stripeCustomerId.toString();

  try {
    const kv = await getRedisClient();

    // Fetch latest payment data from Stripe
    let payments;
    try {
      payments = await stripe.paymentIntents.list({
        customer: customerId,
        limit: 1,
        expand: ["data.payment_method"],
      });
    } catch (stripeError) {
      console.error("[syncStripeDataToKV] Stripe API error:", {
        message: stripeError.message,
        type: stripeError.type,
        code: stripeError.code,
        customerId,
      });
      throw new Error(`Stripe API error: ${stripeError.message}`);
    }

    if (payments.data.length === 0) {
      const paymentData = {
        status: "none",
        stripeCustomerId: customerId,
        lastUpdated: new Date().toISOString(),
      };

      try {
        await kv.set(
          `stripe:customer:${customerId}`,
          JSON.stringify(paymentData)
        );
      } catch (redisError) {
        console.error("[syncStripeDataToKV] Redis set error:", redisError);
        throw new Error(
          `Failed to store default status: ${redisError.message}`
        );
      }

      return paymentData;
    }

    // Get the most recent payment intent
    const paymentIntent = payments.data[0];

    // Store complete payment state
    const paymentData = {
      paymentIntentId: paymentIntent.id,
      status: paymentIntent.status,
      amount: paymentIntent.amount,
      currency: paymentIntent.currency,
      paymentMethod: paymentIntent.payment_method?.type || "unknown",
      created: paymentIntent.created,
      receiptEmail: paymentIntent.receipt_email,
      description: paymentIntent.description,
      metadata: paymentIntent.metadata,
      stripeCustomerId: customerId,
      lastUpdated: new Date().toISOString(),
    };

    if (paymentIntent.status === "succeeded") {
      try {
        await prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            paid: true,
          },
        });
      } catch (dbError) {
        console.error("[syncStripeDataToKV] Database update error:", {
          message: dbError.message,
          code: dbError.code,
          userId,
        });
        // Don't throw here, we still want to store the payment data
      }
    }

    // Store the data in KV
    try {
      await kv.set(
        `stripe:customer:${customerId}`,
        JSON.stringify(paymentData)
      );
    } catch (redisError) {
      console.error("[syncStripeDataToKV] Redis set error:", redisError);
      throw new Error(`Failed to store payment data: ${redisError.message}`);
    }

    return paymentData;
  } catch (err) {
    // Enhanced error logging
    const errorDetails = {
      message: err.message,
      name: err.name,
      type: err.type,
      code: err.code,
      stack: err.stack,
      customerId,
      userId,
      timestamp: new Date().toISOString(),
    };

    // Add Stripe-specific error details if available
    if (err.type === "StripeError") {
      Object.assign(errorDetails, {
        stripeErrorType: err.type,
        stripeErrorCode: err.code,
        stripeErrorMessage: err.message,
        stripeErrorDeclineCode: err.decline_code,
        stripeErrorParam: err.param,
      });
    }

    console.error(
      "[syncStripeDataToKV] Error syncing Stripe data to KV:",
      errorDetails
    );
    throw err; // Re-throw to let caller handle the error
  }
}
