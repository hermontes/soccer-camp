import LogInPage from "./login";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Login - Summer Camp",
  description: "Log in to your Summer Soccer Camp account.",
};

export default async function SignUpServer() {

  const session = await auth.api.getSession({
      headers: await headers(),
    });
  
    //if no session exist and use tried to access sign up page, send user to landing page
    if (!session) {
      return <LogInPage></LogInPage>;
    } else {
      redirect("/dashboard");
    }

}
