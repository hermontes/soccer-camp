"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import DynamicComponent from "./DynamicComponent";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Clock, Users, BadgeCheck, CreditCard, Lock } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { createContext } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Link from "next/link";
export const NavContext = createContext(1);

export default function DashboardClient({ user, paymentData }) {
  const [newName, setNewName] = useState("");
  const [newImage, setNewImage] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const router = useRouter();

  const updateUser = async () => {
    try {
      const response = await authClient.updateUser({
        image: newImage,
        name: newName,
      });

      if (response?.data?.status === true) {
        console.log("Success updating user", response);
        // Handle success - maybe show a toast notification
      } else {
        //if updating wasn't a success, we refresh page since it's most likely due to a 401 unauthorized error(no session)
        console.log("Unauthorized - user session expired");

        router.refresh();
      }
    } catch (error) {
      // Handle unauthorized - redirect to login
      router.push("/login");
      console.log("Error updating user:", error.message);
      // Handle other errors
    }
  };

  const signUserOut = async () => {
    try {
      const w = await authClient.signOut();

      // const sessions = await authClient.listSessions();
      // console.log(list);
      router.refresh(); //I have to refresh so my middleware can catch and check if there's a session and re-route to signup page
    } catch (err) {
      console.log("Error revoking sessions", err);
    }
  };

  const refreshPaymentStatus = async () => {
    setIsRefreshing(true);
    try {
      // Refresh the page to get updated payment data from Redis
      router.refresh();
    } catch (error) {
      console.error("Error refreshing payment status:", error);
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <>
      <div className="flex min-h-screen flex-col">
        <main className="flex flex-1 flex-col bg-muted/40">
          <div className="w-full mx-auto flex-1 space-y-4 p-8 pt-6">
            <div className="flex-1 space-y-4">
              <div className="flex items-center justify-between px-2">
                <div className="grid gap-1">
                  <h1 className="text-3xl font-bold tracking-tight">
                    Dashboard
                  </h1>
                  <p className="text-muted-foreground">
                    Welcome back! Manage your soccer camp registration and
                    information.
                  </p>
                </div>
              </div>
              <div className="grid gap-6">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <Card className="rounded-lg border bg-card text-card-foreground shadow-sm">
                    {/* <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      
                    </CardHeader> */}
                    <CardContent>
                      <div className="flex items-center space-x-4 pt-3">
                        <Avatar>
                          <AvatarImage src={user.image} alt={user.name} />
                          <AvatarFallback className="bg-muted">
                            {user.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium leading-none">
                            {user.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {user.email}
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">
                            Email Verification:
                          </span>
                          <span className="font-medium">
                            {user.emailVerified === false ? (
                              <Badge className="bg-amber-700">
                                Not Verified
                              </Badge>
                            ) : (
                              <span className="flex">
                                <Badge className="bg-[#4CAF50]">
                                  <BadgeCheck />
                                  Verified
                                </Badge>
                              </span>
                            )}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">
                            Registration Payment:
                          </span>
                          <span className="font-medium">
                            {paymentData?.status === "succeeded" ? (
                              <span className="flex">
                                <Badge className="bg-[#4CAF50]">
                                  <BadgeCheck />
                                  Paid
                                </Badge>
                              </span>
                            ) : paymentData?.status === "processing" ? (
                              <Badge className="bg-blue-600">Processing</Badge>
                            ) : paymentData?.status ===
                              "requires_payment_method" ? (
                              <Badge className="bg-amber-700">
                                Payment Required
                              </Badge>
                            ) : paymentData?.status === "canceled" ? (
                              <Badge className="bg-red-600">Canceled</Badge>
                            ) : paymentData?.status === "error" ? (
                              <Badge className="bg-red-600">Error</Badge>
                            ) : user.paid === false ? (
                              <Badge className="bg-amber-700">Missing</Badge>
                            ) : (
                              <span className="flex">
                                <Badge className="bg-[#4CAF50]">Received</Badge>
                              </span>
                            )}
                          </span>
                        </div>

                        {/* Display payment details if available */}
                        {paymentData &&
                          paymentData.status !== "none" &&
                          paymentData.status !== "error" && (
                            <>
                              {paymentData.amount && (
                                <div className="flex items-center justify-between text-sm">
                                  <span className="text-muted-foreground">
                                    Amount Paid:
                                  </span>
                                  <span className="font-medium">
                                    ${(paymentData.amount / 100).toFixed(2)}{" "}
                                    {paymentData.currency?.toUpperCase()}
                                  </span>
                                </div>
                              )}
                              {paymentData.paymentMethod && (
                                <div className="flex items-center justify-between text-sm">
                                  <span className="text-muted-foreground">
                                    Payment Method:
                                  </span>
                                  <span className="font-medium capitalize">
                                    {paymentData.paymentMethod}
                                  </span>
                                </div>
                              )}
                              {paymentData.created && (
                                <div className="flex items-center justify-between text-sm">
                                  <span className="text-muted-foreground">
                                    Payment Date:
                                  </span>
                                  <span className="font-medium">
                                    {new Date(
                                      paymentData.created * 1000
                                    ).toLocaleDateString()}
                                  </span>
                                </div>
                              )}
                              {paymentData.lastUpdated && (
                                <div className="flex items-center justify-between text-sm">
                                  <span className="text-muted-foreground">
                                    Last Updated:
                                  </span>
                                  <span className="font-medium">
                                    {new Date(
                                      paymentData.lastUpdated
                                    ).toLocaleDateString()}
                                  </span>
                                </div>
                              )}
                            </>
                          )}

                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">
                            Registration ID:
                          </span>
                          <span className="font-medium">
                            {user.id.slice(0, 6)}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Camp Countdown
                      </CardTitle>
                      <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">45 days</div>
                      <p className="text-xs text-muted-foreground">
                        Days until camp starts
                      </p>
                      <Progress
                        value={((100 - 45) * 90) / 100}
                        className="mt-3"
                      />
                      <div className="mt-2 text-xs text-muted-foreground">
                        Camp starts on{" "}
                        <span className="font-medium">July 8, 2025</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Team Information
                      </CardTitle>
                      <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">Hawker B</div>
                      <p className="text-xs text-muted-foreground">
                        Age Group: 10-12 years
                      </p>
                      <div className="mt-4 space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Coach:</span>
                          <span className="font-medium">Michael Johnson</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">
                            Team Size:
                          </span>
                          <span className="font-medium">12 players</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
              {user.paid === false && paymentData?.status !== "succeeded" && (
                <div className="max-w-3xl mx-auto">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-center space-y-0 pb-2 border-b-2">
                      <CardTitle className="text-2xl font-medium">
                        Pay for the 2025 summer Session
                      </CardTitle>
                    </CardHeader>
                    <div className="grid md:grid-cols-2   gap-6">
                      <CardContent className="">
                        <div className="text-2xl font-bold">Hawker B</div>
                        <p className="text-xs text-muted-foreground">
                          Age Group: 10-12 years
                        </p>
                        <div className="mt-4 space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">
                              Coach:
                            </span>
                            <span className="font-medium">Michael Johnson</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">
                              Team Size:
                            </span>
                            <span className="font-medium">12 players</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardContent>
                        <div className="flex flex-col">
                          <div className="space-y-2 bg-muted/50 p-3 rounded-xs">
                            <div className="flex items-center justify-between text-md">
                              <div className="">Camp Fee:</div>
                              <div className="font-medium">$100.0</div>
                            </div>
                            <div className="flex items-center justify-between text-sm border-b-2 text-muted-foreground">
                              <span className="">Equipment Fee</span>
                              <span className="">$20.00</span>
                            </div>
                            <div className="flex items-center justify-between text-lg font-bold">
                              <span className="">Total:</span>
                              <span className="font-medium">$220.0</span>
                            </div>
                          </div>
                          <form action="/api/checkout_sessions/" method="POST">
                            <Button
                              type="submit "
                              className="w-full mt-4 bg-[#4CAF50] hover:bg-[#3e8e41] cursor-grab"
                            >
                              {" "}
                              <CreditCard />
                              Pay Now
                            </Button>
                          </form>
                          <div className="flex text-muted-foreground mx-auto text-sm pt-3 items-center gap-1">
                            <Lock className="w-4 h-4 text-sm" />
                            <p>Secured payment with Stripe</p>
                          </div>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                </div>
              )}

              {/* Payment Processing Status */}
              {paymentData?.status === "processing" && (
                <div className="max-w-3xl mx-auto">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-center space-y-0 pb-2 border-b-2">
                      <CardTitle className="text-2xl font-medium text-blue-600">
                        Payment Processing
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-center py-6">
                      <div className="flex items-center justify-center mb-4">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                      </div>
                      <p className="text-lg font-medium mb-2">
                        Your payment is being processed
                      </p>
                      <p className="text-muted-foreground">
                        Please wait while we confirm your payment. This usually
                        takes a few minutes.
                      </p>
                      {paymentData.lastUpdated && (
                        <p className="text-sm text-muted-foreground mb-4">
                          Last updated:{" "}
                          {new Date(paymentData.lastUpdated).toLocaleString()}
                        </p>
                      )}
                      <Button
                        onClick={refreshPaymentStatus}
                        disabled={isRefreshing}
                        variant="outline"
                        className="mt-2"
                      >
                        {isRefreshing ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
                            Refreshing...
                          </>
                        ) : (
                          "Check Status"
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Payment Failed Status */}
              {paymentData?.status === "canceled" && (
                <div className="max-w-3xl mx-auto">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-center space-y-0 pb-2 border-b-2">
                      <CardTitle className="text-2xl font-medium text-red-600">
                        Payment Canceled
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-center py-6">
                      <p className="text-lg font-medium mb-2">
                        Your payment was canceled
                      </p>
                      <p className="text-muted-foreground mb-4">
                        You can try again or contact support if you need
                        assistance.
                      </p>
                      <div className="flex gap-2 justify-center">
                        <form action="/api/checkout_sessions/" method="POST">
                          <Button
                            type="submit"
                            className="bg-[#4CAF50] hover:bg-[#3e8e41]"
                          >
                            <CreditCard className="mr-2 h-4 w-4" />
                            Try Again
                          </Button>
                        </form>
                        <Button
                          onClick={refreshPaymentStatus}
                          disabled={isRefreshing}
                          variant="outline"
                        >
                          {isRefreshing ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
                              Refreshing...
                            </>
                          ) : (
                            "Refresh Status"
                          )}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Payment Success Status */}
              {paymentData?.status === "succeeded" && (
                <div className="max-w-3xl mx-auto">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-center space-y-0 pb-2 border-b-2">
                      <CardTitle className="text-2xl font-medium text-green-600">
                        Payment Successful!
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-center py-6">
                      <div className="flex items-center justify-center mb-4">
                        <BadgeCheck className="h-12 w-12 text-green-600" />
                      </div>
                      <p className="text-lg font-medium mb-2">
                        Your registration is complete!
                      </p>
                      <p className="text-muted-foreground mb-4">
                        Thank you for registering for the 2025 Summer Soccer
                        Camp.
                      </p>
                      {paymentData.amount && (
                        <div className="bg-green-50 p-4 rounded-lg mb-4">
                          <p className="text-sm text-muted-foreground">
                            Amount Paid:
                          </p>
                          <p className="text-xl font-bold text-green-600">
                            ${(paymentData.amount / 100).toFixed(2)}{" "}
                            {paymentData.currency?.toUpperCase()}
                          </p>
                          {paymentData.created && (
                            <p className="text-sm text-muted-foreground mt-1">
                              Paid on{" "}
                              {new Date(
                                paymentData.created * 1000
                              ).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                      )}
                      <p className="text-sm text-muted-foreground">
                        You will receive a confirmation email shortly with camp
                        details.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Debug Information - Only show in development */}
              {process.env.NODE_ENV === "development" && paymentData && (
                <div className="max-w-3xl mx-auto">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm font-medium">
                        Debug: Payment Data from Redis
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <pre className="text-xs bg-muted p-4 rounded overflow-auto">
                        {JSON.stringify(paymentData, null, 2)}
                      </pre>
                      <div className="mt-4 text-sm text-muted-foreground">
                        <p>User paid status: {user.paid ? "true" : "false"}</p>
                        <p>
                          Stripe Customer ID:{" "}
                          {user.stripeCustomerId || "Not set"}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
