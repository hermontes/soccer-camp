"use client";

import { useSession } from "@/lib/auth-client";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import DynamicComponent from "./DynamicComponent";

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
      const revoked = await authClient.revokeSessions();
      console.log("signed out successfully: ", revoked);
      const list = await authClient.listSessions();

      const signOut = await authClient.signOut();

      // const sessions = await authClient.listSessions();
      console.log(list);
      router.refresh(); //I have to refresh so my middleware can catch and check if there's a session and re-route to signup page
    } catch (err) {
      console.log("Error revoking sessions", err);
    }

    // try {
    //   const revoked = await authClient.signOut();
    //   console.log("logout successfully: ", revoked);
    //   router.refresh();
    // } catch (err) {
    //   console.log("Error logout sessions");
    // }
  };

  return (
    <>
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
