//This tell Better-Auth how to behave and what is allowed once the requests are made to route.js
//defines authentication rules and settings
import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { prismaAdapter } from "better-auth/adapters/prisma";

// import { Pool } from "pg";
import { PrismaClient } from "../../generated/prisma";
import { sendEmail } from "@/app/utils/authentication/mail";
const prisma = new PrismaClient();


export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  secret: process.env.BETTER_AUTH_SECRET,
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    requireEmailVerification: true
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url, token }, request) => {
      const verificationURL = `${process.env.BETTER_AUTH_URL}/api/auth/verify-email?token=${token}&callbackURL=${process.env.VERIFIED_EMAIL_REDIRECT}`
      await sendEmail({
        to: user.email,
        subject: "Verify your email address",
        text: `Click this link to confirm your email address and complete setup for your account: ${verificationURL}`,
      });
    },
    sendOnSignUp: true, //send verification email on sign up
    autoSignInAfterVerification: true,
    // requireEmailVerification: true //have to verfiy before can login

  },
  // database: new Pool({
  //   user: process.env.POSTGRES_DATABASE_USER,
  //   host: "localhost",
  //   database: process.env.POSTGRES_DATABASE_NAME,
  //   password: process.env.POSTGRES_PASSWORD,
  //   port: 5432,
  //   max: 20,
  //   idleTimeoutMillis: 30000,
  // }),
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  plugins: [nextCookies()], //enables cookies for server calls
  //When cookie caching is enabled, the server can check session validity from the cookie itself instead of hitting the database each time.
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // 5 mins in cache duration, in seconds
    },
  },
});
