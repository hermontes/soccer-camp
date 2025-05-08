// When someone tries to log in, sign up, or do anything auth-related, this route catches those requests and directs them to auth.js which is configured to tell Better-Auth how to handle such requests.

import { auth } from "@/lib/auth"; // path to your auth file
import { toNextJsHandler } from "better-auth/next-js";
 
export const { POST, GET } = toNextJsHandler(auth);