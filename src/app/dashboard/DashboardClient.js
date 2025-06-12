"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import DynamicComponent from "./DynamicComponent";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  Clock,
  Users,
  BadgeCheck,
  CreditCard,
  Lock,
  Settings,
} from "lucide-react";
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

  const campStartDate = new Date("2025-07-08");

  const countDownToCampDay = () => {
    const today = new Date();
    const diffInMilliSeconds = campStartDate - today;
    const diffInDays = Math.ceil(diffInMilliSeconds / (1000 * 60 * 60 * 24));
    return diffInDays > 0 ? diffInDays : 0;
  };

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
                      <div className="text-2xl font-bold">
                        {countDownToCampDay()} days
                      </div>

                      <div className="mt-2 text-xs text-muted-foreground">
                        Days until camp starts on{" "}
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

                {/* Tabs Section */}
                <Tabs
                  defaultValue="payment"
                  className="w-full max-w-2xl mx-auto"
                >
                  <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
                    <TabsTrigger
                      value="payment"
                      className="flex items-center gap-2"
                    >
                      <CreditCard className="h-4 w-4" />
                      Payment
                    </TabsTrigger>
                    <TabsTrigger
                      value="settings"
                      className="flex items-center gap-2"
                    >
                      <Settings className="h-4 w-4" />
                      Settings
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="payment" className="space-y-4">
                    {/* Payment Status Card */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">
                          Payment Status
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">
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
                                <Badge className="bg-blue-600">
                                  Processing
                                </Badge>
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
                                  <Badge className="bg-[#4CAF50]">
                                    Received
                                  </Badge>
                                </span>
                              )}
                            </span>
                          </div>

                          {/* Payment Details */}
                          {paymentData &&
                            paymentData.status !== "none" &&
                            paymentData.status !== "error" && (
                              <div className="space-y-2 pt-4 border-t">
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
                              </div>
                            )}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Payment Actions */}
                    {user.paid === false &&
                      paymentData?.status !== "succeeded" && (
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-lg">
                              Complete Registration
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="grid md:grid-cols-2 gap-6">
                              <div>
                                <div className="text-lg font-bold">
                                  Hawker B
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  Age Group: 10-12 years
                                </p>
                                <div className="mt-4 space-y-2">
                                  <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">
                                      Coach:
                                    </span>
                                    <span className="font-medium">
                                      Michael Johnson
                                    </span>
                                  </div>
                                  <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">
                                      Team Size:
                                    </span>
                                    <span className="font-medium">
                                      12 players
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div>
                                <div className="space-y-2 bg-muted/50 p-3 rounded">
                                  <div className="flex items-center justify-between text-md">
                                    <div>Camp Fee:</div>
                                    <div className="font-medium">$100.0</div>
                                  </div>
                                  <div className="flex items-center justify-between text-sm border-b-2 text-muted-foreground">
                                    <span>Equipment Fee</span>
                                    <span>$20.00</span>
                                  </div>
                                  <div className="flex items-center justify-between text-lg font-bold">
                                    <span>Total:</span>
                                    <span className="font-medium">$220.0</span>
                                  </div>
                                </div>
                                <form
                                  action="/api/checkout_sessions/"
                                  method="POST"
                                >
                                  <Button
                                    type="submit"
                                    className="w-full mt-4 bg-[#4CAF50] hover:bg-[#3e8e41]"
                                  >
                                    <CreditCard className="mr-2 h-4 w-4" />
                                    Pay Now
                                  </Button>
                                </form>
                                <div className="flex text-muted-foreground mx-auto text-sm pt-3 items-center gap-1">
                                  <Lock className="w-4 h-4 text-sm" />
                                  <p>Secured payment with Stripe</p>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      )}

                    {/* Payment Processing Status */}
                    {paymentData?.status === "processing" && (
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg text-blue-600">
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
                          <p className="text-muted-foreground mb-4">
                            Please wait while we confirm your payment. This
                            usually takes a few minutes.
                          </p>
                          {paymentData.lastUpdated && (
                            <p className="text-sm text-muted-foreground mb-4">
                              Last updated:{" "}
                              {new Date(
                                paymentData.lastUpdated
                              ).toLocaleString()}
                            </p>
                          )}
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
                              "Check Status"
                            )}
                          </Button>
                        </CardContent>
                      </Card>
                    )}

                    {/* Payment Success Status */}
                    {paymentData?.status === "succeeded" && (
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg text-green-600">
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
                            You will receive a confirmation email shortly with
                            camp details.
                          </p>
                        </CardContent>
                      </Card>
                    )}

                    {/* Payment Canceled Status */}
                    {paymentData?.status === "canceled" && (
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg text-red-600">
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
                            <form
                              action="/api/checkout_sessions/"
                              method="POST"
                            >
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
                    )}

                    {/* Debug Information - Only show in development */}
                    {process.env.NODE_ENV === "development" && paymentData && (
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
                            <p>
                              User paid status: {user.paid ? "true" : "false"}
                            </p>
                            <p>
                              Stripe Customer ID:{" "}
                              {user.stripeCustomerId || "Not set"}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </TabsContent>

                  <TabsContent value="settings" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">
                          Account Settings
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <label className="text-sm font-medium">Name</label>
                            <input
                              type="text"
                              value={newName}
                              onChange={(e) => setNewName(e.target.value)}
                              placeholder="Update your name..."
                              className="w-full mt-1 p-2 border rounded-md"
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium">
                              Profile Image URL
                            </label>
                            <input
                              type="text"
                              value={newImage}
                              onChange={(e) => setNewImage(e.target.value)}
                              placeholder="Update your profile image URL..."
                              className="w-full mt-1 p-2 border rounded-md"
                            />
                          </div>
                          <Button onClick={updateUser} className="w-full">
                            Update Profile
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">
                          Account Actions
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Button
                          onClick={signUserOut}
                          variant="destructive"
                          className="w-full"
                        >
                          Sign Out
                        </Button>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
