"use client";
import Navigation from "@/components/ui/navigation/Navigation";

import { useSession } from "@/lib/auth-client";

export default function HomePage() {
  const { data: session } = useSession();

  return <div className="flex w-full bg-center">HomePage content</div>;
}
