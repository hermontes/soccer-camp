
// creating Stripe Checkout Session after UI trigger

import { NextResponse } from "next/server";
import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import { stripe } from "@/lib/stripe";

export async function POST() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if(!session || !session.user.stripeCustomerId) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  try {
    const headersList = await headers();
    const origin = headersList.get("origin");

    const checkOutSession = await stripe.checkout.sessions.create({
      customer: session.user.stripeCustomerId,
      line_items: [
        {
          // Provide  Price ID (for example, price_1234) of the product you want to sell
          price: process.env.STRIPE_PRICE_ID,
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${origin}/dashboard/stripe/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/dashboard/stripe?canceled=true`,
      // automatic_tax: { enabled: true },
      
    });

    return NextResponse.redirect(checkOutSession.url, 303);
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    );
  }
}
