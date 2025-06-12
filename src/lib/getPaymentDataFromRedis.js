import { getRedisClient } from "./redis";

export async function getPaymentDataFromRedis(stripeCustomerId) {
  if (!stripeCustomerId) {
    return {
      status: "none",
      stripeCustomerId: null,
      lastUpdated: null,
      error: "No Stripe customer ID available",
    };
  }

  try {
    const kv = await getRedisClient();
    const paymentDataString = await kv.get(
      `stripe:customer:${stripeCustomerId}`
    );

    if (!paymentDataString) {
      return {
        status: "none",
        stripeCustomerId: stripeCustomerId,
        lastUpdated: new Date().toISOString(),
        error: "No payment data found in Redis",
      };
    }

    const paymentData = JSON.parse(paymentDataString);
    return paymentData;
  } catch (error) {
    console.error(
      "[getPaymentDataFromRedis] Error fetching payment data:",
      error
    );
    return {
      status: "error",
      stripeCustomerId: stripeCustomerId,
      lastUpdated: new Date().toISOString(),
      error: error.message,
    };
  }
}
