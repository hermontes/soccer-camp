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

export default function DashboardClient({ user }) {
  const [newName, setNewName] = useState("");
  const [newImage, setNewImage] = useState("");

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
                            {user.paid === false ? (
                              <Badge className="bg-amber-700">Missing</Badge>
                            ) : (
                              <span className="flex">
                                <Badge className="bg-[#4CAF50]">Received</Badge>
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
              {user.paid === false && (
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

              {/* <div className="flex w-full flex-col items-center p-[10rem]">
        <div className="">Current session user name: {user.name}</div>
        <div>Current session user email: {user.email}</div>
        <div>Current session user ID: {user.id}</div>{" "}
        <button
          className="cursor-grab bg-cyan-500 p-[1rem]"
          onClick={signUserOut}
        >
          Sign out
        </button>
        <DynamicComponent session={session}></DynamicComponent>
        <input
          type="name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Set new name..."
        />
        <input
          className="outline-none"
          type="name"
          value={newImage}
          onChange={(e) => setNewImage(e.target.value)}
          placeholder="Set new image..."
        />
        <button
          className="cursor-grab bg-cyan-500 p-[1rem]"
          onClick={updateUser}
        >
          Update User
        </button>
      </div> */}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
