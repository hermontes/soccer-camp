"use client";

import { useSession } from "@/lib/auth-client";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import DynamicComponent from "./DynamicComponent";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { Clock } from "lucide-react";
import { Progress } from "@/components/ui/progress";


export default function DashboardClient({ user }) {
  const [newName, setNewName] = useState("");
  const {
    data: session,
    isPending,
    error,
    refetch,
    removeSessions,
  } = useSession();

  const updateUser = async () => {
    await authClient.updateUser({
      image: "https://example.com/image.jpg",
      name: newName,
    });
  };

  useEffect(() => {
    refetch();
  }, []);

  const router = useRouter();

  // useEffect(() => {
  //   if (session) {
  //     console.log("Session updated:", session);
  //     // if (!session) {
  //     refetch()
  //     // router.push("/signup");
  //   }
  //   // }
  // }, [session, isPending]);

  const listSessions = async () => {
    // try {
    //   const sessions = await authClient.listSessions();
    //   console.log(sessions);
    // } catch (err) {
    //   console.log("Error printing sessions");
    // }

    try {
      // const revoked = await authClient.revokeSessions();
      // console.log("signed out successfully: ", revoked);
      // const list = await authClient.listSessions();

      const signOut = await authClient.signOut();

      // const sessions = await authClient.listSessions();
      // console.log(list);
      router.refresh(); //I have to refresh so my middleware can catch and check if there's a session and re-route to signup page
    } catch (err) {
      console.log("Error revoking sessions", err);
    }
  };

  return (
    <>
    
      <Card className="m-10">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Registration Status
          </CardTitle>
          <Badge
            variant={
              session?.user ? "default" : "outline"
            }
            className="bg-[#4CAF50]"
          >
            {session?.user.emailVerified}
          </Badge>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage
                src={user.avatar || "/placeholder.svg"}
                alt={user.name}
              />
              <AvatarFallback>{session?.user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium leading-none">{session?.user.name}</p>
              <p className="text-sm text-muted-foreground">{session?.user.email}</p>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Payment Status:</span>
              <span className="font-medium">{session?.user.paymentStatus}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Registration ID:</span>
              <span className="font-medium">{session?.user.id}</span>
            </div>
          </div>
        </CardContent>
      </Card>


      <Card className="m-10">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Camp Countdown</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">45 days</div>
          <p className="text-xs text-muted-foreground">Days until camp starts</p>
          <Progress value={(100-45)*(90) / 100} className="mt-3" />
          <div className="mt-2 text-xs text-muted-foreground">
            Camp starts on <span className="font-medium">July 8, 2025</span>
          </div>
        </CardContent>
      </Card>


      <div className="flex w-full flex-col items-center p-[10rem]">
        <div className="">Current session user name: {user.name}</div>
        <div>Current session user email: {user.email}</div>
        <div>Current session user ID: {user.id}</div>{" "}
        <button
          className="cursor-grab bg-cyan-500 p-[1rem]"
          onClick={listSessions}
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
        <button
          className="cursor-grab bg-cyan-500 p-[1rem]"
          onClick={updateUser}
        >
          Update User
        </button>
      </div>
    </>
  );
}
