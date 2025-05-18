import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function BackButton({link}) {
  return (
    <div className="pl-6 text-sm">
      <Link href={link}>
        <ArrowLeft className="hover:-translate-x-0.5 ease-in-out transition delay-100 " />
      </Link>
    </div>
  );
}
