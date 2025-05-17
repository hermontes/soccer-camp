import { redirect } from "next/navigation";
import { CheckCircle, ArrowLeft } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { stripe } from "@/lib/stripe";
import { toast } from "sonner";
import PaymentIncomplete from "../failure/page";
export default async function Success({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id) {
    redirect("/dashboard/stripe/failure");
  }

  const {
    status,
    customer,
    customer_details: { email: customerEmail },
    amount_subtotal,
    client_reference_id,
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent", "customer"],
  });

  if (status === "open") {
    return redirect("/");
  }

  if (status === "complete") {
    return (
      <div className="container mx-auto py-8 px-4 max-w-3xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold">Payment Successful!</h1>
          <p className="text-gray-500 mt-2">
            Thank you for your payment. Your summer camp registration is now
            complete.
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader className="">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Payment Receipt</h2>
              {/* <p className="text-sm text-gray-500">
                Reference: #{client_reference_id?.slice(-8)}
              </p> */}
            </div>
          </CardHeader>
          <CardContent className="">
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-4">
                <h3 className="font-medium text-gray-900">Payment Details</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Amount Paid</span>
                    <span className="font-medium">
                      $ {amount_subtotal / 100}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-500">Email</span>
                    <span className="text-sm">{customerEmail}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="pt-2">
            <Link href="/dashboard" className="w-full ">
              <Button variant="default" className="w-full cursor-grab">
                <ArrowLeft className="mr-2 h-4 w-4" /> Return to Dashboard
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    );
  }
}
