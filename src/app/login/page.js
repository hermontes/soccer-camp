import LogInPage from "./login";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Login - Summer Camp",
  description: "Log in to your Summer Soccer Camp account.",
};

export default async function LoginServer() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return <LogInPage />;
  }

  redirect("/dashboard");
}
