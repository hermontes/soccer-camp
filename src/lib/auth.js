//This tell Better-Auth how to behave and what is allowed once the requests are made to route.js
//defines authentication rules and settings
import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { Pool } from "pg";


export const auth = betterAuth({
  // secret: process.env.BETTER_AUTH_SECRET,
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
  },
  database: new Pool({
    user: process.env.POSTGRES_DATABASE_USER,
    host: "localhost",
    database: process.env.POSTGRES_DATABASE_NAME,
    password: process.env.POSTGRES_PASSWORD,
    port: 5432,
    max: 20,
    idleTimeoutMillis: 30000,
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
