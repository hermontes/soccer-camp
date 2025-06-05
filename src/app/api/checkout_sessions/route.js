// creating Stripe Checkout Session after UI trigger

import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { getRedisClient } from "@/lib/redis";
import { auth } from "@/lib/auth";
import { stripe } from "@/lib/stripe";

export async function POST() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session.user.stripeCustomerId) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  //to do: if a customer already paid, send them back

  try {
    const client = await getRedisClient();

    await client.set(`stripe:user:${session.user.id}`, session.user.stripeCustomerId);
    const result = await client.get(session.user.stripeCustomerId);
    console.log("The result after fetching by the key:", result);
  } catch (err) {
    console.error("Redis operation failed:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }

  try {
    const headersList = await headers();
    const origin = headersList.get("origin");

    const checkOutSession = await stripe.checkout.sessions.create({
      customer: session.user.stripeCustomerId,
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID,
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${origin}/dashboard/stripe/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/dashboard/?canceled=true`,
    });

    return NextResponse.redirect(checkOutSession.url, 303);
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    );
  }
}
