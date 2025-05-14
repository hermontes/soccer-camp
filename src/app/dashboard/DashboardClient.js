"use client";


import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import DynamicComponent from "./DynamicComponent";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Clock } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { createContext } from "react";
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

  // useEffect(() => {
  //   refetch();
  // }, []);

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
      <div className="grid md:grid-cols-2 lg:grid-cols-2  p-5 sm:p-20 gap-2 grid-cols-1">
        <Card className="">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Registration Status
            </CardTitle>
            <Badge
              variant={user ? "default" : "outline"}
              className="bg-[#4CAF50]"
            >
              Confirmed
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage className="" src={user.image} alt={user.name} />
                <AvatarFallback className="bg-muted">
                  {user.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium leading-none">{user.name}</p>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  Email Verification:
                </span>
                <span className="font-medium">
                  {user.emailVerified === false ? (
                    <Badge className="bg-amber-700">Not Verified</Badge>
                  ) : (
                    <Badge className="bg-[#4CAF50]">Verified</Badge>
                  )}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Registration ID:</span>
                <span className="font-medium">{user.id.slice(0, 6)}</span>
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
            <Progress value={((100 - 45) * 90) / 100} className="mt-3" />
            <div className="mt-2 text-xs text-muted-foreground">
              Camp starts on <span className="font-medium">July 8, 2025</span>
            </div>
          </CardContent>
        </Card>
      </div>
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
    </>
  );
}
