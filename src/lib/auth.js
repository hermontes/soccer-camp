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
import { syncStripeDataToKV } from "./syncStripeDataToKV";
import { allowedEvents } from "./stripeEvents";

const prisma = new PrismaClient();

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  secret: process.env.BETTER_AUTH_SECRET,
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    // requireEmailVerification: true,
  },

  // emailVerification: {
  //   // sendVerificationEmail: async ({ user, url, token }, request) => {
  //   //   const verificationURL = `${process.env.BETTER_AUTH_URL}/api/auth/verify-email?token=${token}&callbackURL=${process.env.VERIFIED_EMAIL_REDIRECT}`;
  //   //   await sendEmail({
  //   //     to: user.email,
  //   //     subject: "Verify your email address",
  //   //     text: `Click this link to confirm your email address and complete setup for your account. This verification link is only valid for 15 minutes: ${verificationURL}`,
  //   //   });
  //   // },
  //   // sendOnSignUp: true, //send verification email on sign up
  //   autoSignInAfterVerification: true,
  //   expiresIn: 900, //verification token valid for 30 minutes
  // },
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  user: {
    additionalFields: {
      paid: {
        type: Boolean,
        nullable: false,
      },
    },
  },
  plugins: [
    nextCookies(),
    stripe({
      stripeClient: new Stripe(process.env.STRIPE_SECRET_KEY), //enables cookies for server calls
      stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
      onEvent: async (event) => {
        // Handle pre-defined Stripe events
        if (allowedEvents.includes(event.type)) {
          try {
            const session = event.data.object;
            // Sync payment data to KV using Stripe customer ID
            await syncStripeDataToKV(session.customer);
          } catch (error) {
            console.error("Error handling webhooks", error);
          }
        }
      },
      createCustomerOnSignUp: true,
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
