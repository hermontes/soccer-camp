// This gives us tools for the frontend to interact with the auth system.
// Like telling Better-Auth we want to login which then receives those api requests(routes.js), follows rules in auth.js and gets processes in Better-Auth
import { createAuthClient } from "better-auth/react"
export const authClient = createAuthClient({
    /** The base URL of the server (optional if you're using the same domain) */
    baseURL: "http://localhost:3000"
})

export const { signIn, signUp, signOut, useSession } = authClient
