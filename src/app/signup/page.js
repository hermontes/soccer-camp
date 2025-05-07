
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import SignUpPage from "./signup";
export default async function SignUpServer() {

  const session = await auth.api.getSession({
      headers: await headers(),
    });
  
    //if no session exist and use tried to access sign up page, send user to landing page
    if (!session) {
      return <SignUpPage></SignUpPage>;
    } else {
      redirect("/dashboard");
    }

}
