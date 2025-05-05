"use client"
import Navigation from "@/components/ui/Navigation";

import { useSession } from "@/lib/auth-client";

export default function HomePage() {
  const { data: session } = useSession();

  return (
    <div>
      <Navigation session={session}></Navigation>
    </div>
  );
}
