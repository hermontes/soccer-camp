import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { stripe } from "@better-auth/stripe";
import Stripe from "stripe";
import { prisma } from "./prisma";
import { syncStripeDataToKV } from "./syncStripeDataToKV";
import { allowedEvents } from "./stripeEvents";

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  secret: process.env.BETTER_AUTH_SECRET,
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
  },
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
      stripeClient: new Stripe(process.env.STRIPE_SECRET_KEY),
      stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
      onEvent: async (event) => {
        if (allowedEvents.includes(event.type)) {
          try {
            const session = event.data.object;
            await syncStripeDataToKV(session.customer);
          } catch (error) {
            console.error("Error handling webhooks", error);
          }
        }
      },
      createCustomerOnSignUp: true,
    }),
  ],
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60,
    },
  },
});
