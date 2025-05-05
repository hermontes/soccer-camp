

import { useSession, authClient } from "@/lib/auth-client";

export default function DynamicComponent() {
  const { data: session, isPending } = useSession();


  return (
    <>
      {session ? (
        <>
          <div>Current session user name: {session?.user.name}</div>
          <div>Current session user email: {session?.user.email}</div>
          <div>Current session user ID: {session?.user.id}</div>{" "}
        </>
      ) : (
        "No session"
      )}
    </>
  );
}
