import { redirect } from "next/navigation";
import { CheckCircle, ArrowLeft } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { stripe } from "@/lib/stripe";
import { syncStripeDataToKV } from "@/lib/syncStripeDataToKV";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export const metadata = {
  title: "Payment Successful - Summer Camp",
  description: "Your Summer Soccer Camp registration payment was successful.",
};

export default async function Success({ searchParams }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const { session_id } = searchParams;

  if (!session_id) {
    redirect("/dashboard/stripe/failure");
  }

  const checkoutSession = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent", "customer"],
  });

  if (checkoutSession.status === "open") {
    return redirect("/");
  }

  if (checkoutSession.status !== "complete") {
    console.log("Checkout session not complete:", checkoutSession.status);
    redirect("/dashboard/stripe/failure");
  }

  // Use the customer ID from the checkout session
  const customerId = checkoutSession.customer;
  if (!customerId) {
    console.error("No customer ID found in checkout session");
    redirect("/dashboard/stripe/failure");
  }

  // Only sync payment data after confirming checkout is complete
  const data = await syncStripeDataToKV(customerId);
  console.log("Payment data synced:", data);

  return (
    <div className="container mx-auto py-8 px-4 max-w-3xl">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold">Payment Successful</h1>
        <p className="text-gray-500 mt-2">
          Thank you for your payment. Your summer camp registration is now
          complete.
        </p>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Payment Receipt</h2>
            <p className="text-sm text-gray-500">
              ID: {data.paymentIntentId?.slice(-8)}
            </p>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-4">
              <h3 className="font-medium text-gray-900">Payment Details</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500">Amount Paid</span>
                  <span className="font-medium">
                    ${(data.amount / 100).toFixed(2)}{" "}
                    {data.currency.toUpperCase()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Status</span>
                  <span className="font-medium capitalize">{data.status}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Payment Method</span>
                  <span className="font-medium capitalize">
                    {data.paymentMethod}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Email</span>
                  <span className="text-sm">{data.receiptEmail}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Date</span>
                  <span className="text-sm">
                    {new Date(data.created * 1000).toLocaleDateString()}
                  </span>
                </div>
                {data.description && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Description</span>
                    <span className="text-sm">{data.description}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="pt-2">
          <Link href="/dashboard" className="w-full">
            <Button variant="default" className="w-full">
              <ArrowLeft className="mr-2 h-4 w-4" /> Return to Dashboard
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
