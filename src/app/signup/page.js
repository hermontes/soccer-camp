
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import SignUpPage from "./signup";

export const metadata = {
  title: "Sign Up - Summer Camp",
  description: "Sign up for the Summer Soccer Camp.",
};

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
