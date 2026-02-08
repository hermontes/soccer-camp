import { redirect } from "next/navigation";
import DashboardClient from "./DashboardClient";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getPaymentDataFromRedis } from "@/lib/getPaymentDataFromRedis";

export const metadata = {
  title: "Dashboard - Summer Camp",
  description: "Manage your soccer camp registration and information.",
};

export default async function Dashboard() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw redirect("/login");
  }

  const paymentData = await getPaymentDataFromRedis(
    session.user.stripeCustomerId
  );

  return <DashboardClient user={session.user} paymentData={paymentData} />;
}
