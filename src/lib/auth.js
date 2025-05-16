//This tell Better-Auth how to behave and what is allowed once the requests are made to route.js
//defines authentication rules and settings
import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { stripe } from "@better-auth/stripe";
import Stripe from "stripe";
// import { Pool } from "pg";
import { PrismaClient } from "../../generated/prisma";
import { sendEmail } from "../app/utils/authentication/mail";
const prisma = new PrismaClient();

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  secret: process.env.BETTER_AUTH_SECRET,
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    requireEmailVerification: true,
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url, token }, request) => {
      const verificationURL = `${process.env.BETTER_AUTH_URL}/api/auth/verify-email?token=${token}&callbackURL=${process.env.VERIFIED_EMAIL_REDIRECT}`;
      await sendEmail({
        to: user.email,
        subject: "Verify your email address",
        text: `Click this link to confirm your email address and complete setup for your account. This verification link is only valid for 15 minutes: ${verificationURL}`,
      });
    },
    sendOnSignUp: true, //send verification email on sign up
    autoSignInAfterVerification: true,
    expiresIn: 900, //verification token valid for 30 minutes
  },
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  plugins: [
    nextCookies(),
    stripe({
      stripeClient: new Stripe(process.env.STRIPE_SECRET_KEY), //enables cookies for server calls
      stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
      onEvent: async (event) => {
        // Handle any Stripe event
        if (event.type === "checkout.session.completed") {
          const session = event.data.object;
          //at this point call the check out success function
          //associate this with a custoemr from my DB
          console.log("got back customer ID: : ", session.customer);
          await prisma.user.updateMany({
            where: { stripeCustomerId: session.customer},
            data: { paid: true },
          });

          console.log("CHECKOUT SESSSSSSION", session);
          // Inspect session.payment_status or session.payment_intent
          // Update your database here
        }
      },
      createCustomerOnSignUp: true,
      // subscription: {
      //   enabled: true,
      //   plans: [
      //     {
      //       name: "starter",
      //       priceId: process.env.STARTER_PRICE_ID,
      //       successUrl: "/dashboard",
      //       cancelUrl: "/pricing",
      //       // annualDiscountPriceId: STARTER_PRICE_ID.annual, //optional
      //       // freeTrial: {
      //       // 	days: 7,
      //       // },
      //     },
      //   ],
      // },
    }),
  ],
  //When cookie caching is enabled, the server can check session validity from the cookie itself instead of hitting the database each time.
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // 5 mins in cache duration, in seconds
    },
  },
});
