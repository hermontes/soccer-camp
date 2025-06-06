import { getRedisClient } from "./redis";
import { stripe } from "@/lib/stripe";

export async function syncStripeDataToKV(stripeCustomerId) {
  if (!stripeCustomerId) {
    throw new Error("stripeCustomerId is required");
  }

  try {
    const kv = await getRedisClient();

    // Fetch latest payment data from Stripe
    const payments = await stripe.paymentIntents.list({
      customer: stripeCustomerId,
      limit: 1,
      expand: ["data.payment_method"],
    });

    if (payments.data.length === 0) {
      const paymentData = { status: "none" };
      await kv.set(
        `stripe:customer:${stripeCustomerId}`,
        JSON.stringify(paymentData)
      );
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
    };

    // Store the data in your KV
    await kv.set(`stripe:customer:${customerId}`, paymentData);

    return paymentData;
  } catch (err) {
    console.log("Error while trying to sync data", err);
  }
}
