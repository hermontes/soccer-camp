// This gives us tools for the frontend to interact with the auth system.
// Like telling Better-Auth we want to login which then receives those api requests(routes.js), follows rules in auth.js and gets processed in Better-Auth
import { createAuthClient } from "better-auth/react";
import { stripeClient } from "@better-auth/stripe/client";
import { adminClient } from "better-auth/client/plugins"

export const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  baseURL: process.env.BETTER_AUTH_URL,
  plugins: [
    adminClient(),
    stripeClient({
      subscription: true, //if you want to enable subscription management
    })
  ],
});

export const { signIn, signUp, signOut, useSession } = authClient;
