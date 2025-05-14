import "./globals.css";

// import { Navbar1 } from "@/components/navbar1";
import Navigation from "@/components/navigation/Navigation";

// import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { Toaster } from "@/components/ui/sonner";


export const metadata = {
  title: "Summer Camp",
  description: "Summer Soccer Camp registration for youth all ages",
};

export default async function RootLayout({ children }) {

  // const session = await auth.api.getSession({
  //   headers: await headers(),
  // });

  return (
    <html lang="en">
      <body className="bg-[#F9FAFB]">
        <Navigation ></Navigation>
        {/* <Navbar1></Navbar1> */}
        {children}
        <Toaster theme="light"/>
      </body>
    </html>
  );
}
