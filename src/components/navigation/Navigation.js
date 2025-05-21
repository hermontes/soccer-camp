"use client";

import Link from "next/link";
import {
  Menu,
  LogOut,
  ChevronDown,
  ChevronUp,
  LayoutDashboard,
  Settings,
} from "lucide-react";
import { Icon } from "lucide-react";
import { soccerBall } from "@lucide/lab";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { NavContext } from "@/app/dashboard/DashboardClient";
import { useContext } from "react";
import { authClient } from "@/lib/auth-client";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navigation({ session }) {
  const router = useRouter();
  const [dropDown, setDropDown] = useState(false);
  const passed = useContext(NavContext);

  const toggleDropDown = () => {
    setDropDown((prev) => !prev);
  };

  const signOut = async () => {
    try {
      const successSignOut = await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/login");
          },
        },
      });
      router.refresh();
    } catch (err) {
      console.log("actual error");
    }
  };

  return (
    <section className="">
      <header className="w-full border-b bg-white shadow-sm px-2">
        <div className=" mx-auto flex h-16 items-center justify-between ">
          <Link href="/" className="font-bold text-xl flex items-center">
            <span className="text-[#4CAF50]">Soccer</span>Camp
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="text-sm font-medium text-gray-800 hover:text-[#4CAF50] transition-colors"
            >
              Home
            </Link>
            <Link
              href="/dashboard"
              className="text-sm font-medium text-gray-800 hover:text-[#4CAF50] transition-colors"
            >
              Schedule
            </Link>
            <Link
              href="/dashboard"
              className="text-sm font-medium text-gray-800 hover:text-[#4CAF50] transition-colors"
            >
              Facilities
            </Link>
            <Link
              href="/dashboard"
              className="text-sm font-medium text-gray-800 hover:text-[#4CAF50] transition-colors"
            >
              FAQ
            </Link>
            <Link
              href="/dashboard"
              className="text-sm font-medium text-gray-800 hover:text-[#4CAF50] transition-colors"
            >
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            {!session ? (
              <>
                <Button
                  variant="outline"
                  asChild
                  className="hidden md:flex border-gray-300 text-gray-800 hover:text-[#4CAF50] hover:border-[#4CAF50]"
                >
                  <Link href="/login">Login</Link>
                </Button>
                <Button
                  asChild
                  className="hidden md:flex bg-[#4CAF50] hover:bg-[#3e8e41]"
                >
                  <Link href="/signup">Sign up</Link>
                </Button>
              </>
            ) : (
              <>
                <DropdownMenu
                  onOpenChange={setDropDown}
                  className="outline-none"
                >
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="flex items-center h-auto hover:bg-gray-100 rounded-full cursor-pointer"
                    >
                      <Avatar>
                        <AvatarImage
                          src={session?.user.image || ""}
                          alt={session?.user.name || "User"}
                        />
                        <AvatarFallback className="bg-[#4CAF50] text-white">
                          {session?.user.name?.charAt(0) || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium hidden md:inline">
                        {session?.user.name}
                      </span>
                      {dropDown ? (
                        <ChevronUp className="h-4 w-4 text-gray-500" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-gray-500" />
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-35 rounded-b-md mt-1 mr-3 !shadow-xl "
                  >
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard" className="cursor-pointer w-full">
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        <span>Dashboard</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard" className="cursor-pointer w-full">
                        <Icon iconNode={soccerBall} className="mr-2 h-4 w-4" />
                        <span>Team</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-red-600 focus:text-red-600 cursor-pointer"
                      onClick={() => signOut()}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Sign out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5 cursor-pointer"> </Menu>
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <nav className="flex flex-col gap-4 mt-8">
                  <Link
                    href="/"
                    className="text-sm font-medium hover:text-[#4CAF50] transition-colors"
                  >
                    Home
                  </Link>
                  <Link
                    href="/dashboard"
                    className="text-sm font-medium hover:text-[#4CAF50] transition-colors"
                  >
                    Programs
                  </Link>
                  <Link
                    href="/dashboard"
                    className="text-sm font-medium hover:text-[#4CAF50] transition-colors"
                  >
                    Schedule
                  </Link>
                  <Link
                    href="/dashboard"
                    className="text-sm font-medium hover:text-[#4CAF50] transition-colors"
                  >
                    Facilities
                  </Link>
                  <Link
                    href="/dashboard"
                    className="text-sm font-medium hover:text-[#4CAF50] transition-colors"
                  >
                    FAQ
                  </Link>
                  <Link
                    href="/dashboard"
                    className="text-sm font-medium hover:text-[#4CAF50] transition-colors"
                  >
                    Contact
                  </Link>
                  <div className="flex flex-col gap-2 mt-4">
                    <Button variant="outline" asChild className="w-full">
                      <Link href="/login">Login</Link>
                    </Button>
                    <Button
                      asChild
                      className="w-full bg-[#4CAF50] hover:bg-[#3e8e41]"
                    >
                      <Link href="/signup">Sign up</Link>
                    </Button>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </section>
  );
}
