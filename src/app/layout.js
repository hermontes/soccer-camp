import "./globals.css";
import Navigation1 from "@/components/ui/navigation/Navigation";
import { Navbar1 } from "@/components/navbar1";
export const metadata = {
  title: "Summer Camp",
  description: "Summer Soccer Camp registration for youth all ages",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#F9FAFB]">
        {/* <Navigation1></Navigation1> */}
        <Navbar1></Navbar1>
        {children}
      </body>
    </html>
  );
}
