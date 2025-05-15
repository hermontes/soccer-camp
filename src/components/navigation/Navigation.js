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
// import { Loader } from "lucide-react";
import { useSession } from "@/lib/auth-client";
import { Skeleton } from "../ui/skeleton";
import { authClient } from "@/lib/auth-client";
import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navigation() {
  const { setTheme, theme } = useTheme();

  const { data: session, isPending } = authClient.useSession();

  const router = useRouter();
  const [dropDown, setDropDown] = useState(false);

  const passed = useContext(NavContext);

  const toggleDropDown = () => {
    setDropDown((prev) => !prev);
  };

  const signOut = async () => {
    console.log("IN");
    try {
      const successSignOut = await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/login"); // redirect to login page
          },
        },
      });
      router.refresh();

      //if they attempt to sign in while there's already a session in this browser, we forbid it and force them to the dashboard

      // console.log((await session).user.name)

      // await signUserOut()
      //   .then((res) => {
      //     console.log(res);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
    } catch (err) {
      console.log("actual error");
    }
  };

  return (
    <section className="">
      <header className="w-full border-b bg-background shadow-sm px-2">
        <div className="mx-auto flex h-16 items-center justify-between">
          {/* Logo with theme-aware colors */}
          <Link href="/" className="font-bold text-xl flex items-center">
            <span className="text-primary">Soccer</span>
            <span className="text-foreground">Camp</span>
          </Link>

          {/* Main Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {["Home", "Schedule", "Facilities", "FAQ", "Contact"].map(
              (item) => (
                <Link
                  key={item}
                  href={item === "Home" ? "/" : "/dashboard"}
                  className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                >
                  {item}
                </Link>
              )
            )}
          </nav>

          {/* Auth/Session Section */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            {!session && !isPending ? (
              <>
                <Button
                  variant="outline"
                  asChild
                  className="hidden md:flex border-border text-foreground hover:text-primary hover:border-primary"
                >
                  <Link href="/login">Login</Link>
                </Button>
                <Button
                  asChild
                  className="hidden md:flex bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  <Link href="/signup">Sign up</Link>
                </Button>
              </>
            ) : (
              <>
                {isPending ? (
                  <div className="flex gap-1 items-center justify-center">
                    <Skeleton className="size-8 rounded-full bg-primary/50" />
                    <Skeleton className="h-6 w-20 bg-primary/50" />
                  </div>
                ) : (
                  <DropdownMenu onOpenChange={setDropDown}>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="flex items-center h-auto hover:bg-accent rounded-full cursor-pointer"
                      >
                        <Avatar>
                          <AvatarImage
                            src={session?.user.image || ""}
                            alt={session?.user.name || "User"}
                          />
                          <AvatarFallback className="dark:bg-primary bg-[var(--default-green)] text-white">
                            {session?.user.name?.charAt(0) || "U"}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium hidden md:inline text-foreground">
                          {session?.user.name}
                        </span>
                        {dropDown ? (
                          <ChevronUp className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="h-4 w-4 text-muted-foreground" />
                        )}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="w-35 rounded-b-md mt-1 mr-3 shadow-xl"
                    >
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link
                          href="/dashboard"
                          className="cursor-pointer w-full"
                        >
                          <LayoutDashboard className="mr-2 h-4 w-4" />
                          <span>Dashboard</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link
                          href="/dashboard"
                          className="cursor-pointer w-full"
                        >
                          <Icon
                            iconNode={soccerBall}
                            className="mr-2 h-4 w-4"
                          />
                          <span>Team</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-destructive focus:text-destructive cursor-pointer"
                        onClick={signOut}
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Sign out</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </>
            )}

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <nav className="flex flex-col gap-4 mt-8">
                  {["Home", "Schedule", "Facilities", "FAQ", "Contact"].map(
                    (item) => (
                      <Link
                        key={item}
                        href="/"
                        className="text-sm font-medium hover:text-primary transition-colors"
                      >
                        {item}
                      </Link>
                    )
                  )}
                  <div className="flex flex-col gap-2 mt-4">
                    <Button variant="outline" asChild className="w-full">
                      <Link href="/login">Login</Link>
                    </Button>
                    <Button
                      asChild
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
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
