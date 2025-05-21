import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import Navigation from "./Navigation";

export default async function NavigationLayout() {

  const session = await auth.api.getSession({
    headers: await headers()
  })

  return <Navigation session={session} />;
}
