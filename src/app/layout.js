import "./globals.css";
import NavigationLayout from "@/components/navigation/layout";
import { Toaster } from "@/components/ui/sonner";

export const metadata = {
  title: "Summer Camp",
  description: "Summer Soccer Camp registration for youth all ages",
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#F9FAFB]">
        <NavigationLayout />
        {children}
        <Toaster theme="light" />
      </body>
    </html>
  );
}
