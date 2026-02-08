import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function GameSchedule() {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <h1>Game Schedule</h1>
      <Link href="/signup">Sign In</Link>
      <Button className="text-amber-300 cursor-pointer">Click Me</Button>
    </div>
  );
}
