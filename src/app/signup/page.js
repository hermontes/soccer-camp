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

  if (!session) {
    return <SignUpPage />;
  }

  redirect("/dashboard");
}
