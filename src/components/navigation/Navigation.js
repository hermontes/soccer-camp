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
// import { Loader } from "lucide-react";
import { useSession } from "@/lib/auth-client";
import { Skeleton } from "../ui/skeleton";
import { authClient } from "@/lib/auth-client"

function classNames(...classes) {

  return classes.filter(Boolean).join(" ");
}

export default function Navigation() {
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
      <header className="w-full border-b bg-white shadow-sm">
        <div className=" mx-auto flex h-16 items-center justify-between px-2">
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
            {/* <Link
              href="/dashboard"
              className="text-sm font-medium text-gray-800 hover:text-[#4CAF50] transition-colors"
            >
              {passed === 2 ? " passed" : passed}
            </Link> */}
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
            {!session && !isPending ? (
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
              <div className="lg:w-42">
                {isPending ? (
                  <div className="flex gap-1 items-center justify-center" >
                    <Skeleton className="size-8 rounded-full bg-[#4CAF50]/50" />

                    <Skeleton className="h-6 w-20 bg-[#4CAF50]/50" />
                  </div>
                ) : (
                  <>
                    <DropdownMenu
                      onOpenChange={setDropDown}
                      className="outline-none"
                    >
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className="flex items-center gap-2 p-1 px-2 h-auto hover:bg-gray-100 rounded-full cursor-pointer"
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
                        className="w-35 rounded-b-md mt-2 !shadow-xl "
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
              </div>
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
    // <div>
    //   <div className="w-full max-w-md mx-auto bg-white rounded-2xl"></div>
    //   <nav className="bg-white border-gray-200 dark:bg-gray-900">
    //     <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    //       <a
    //         href="https://flowbite.com/"
    //         className="flex items-center space-x-3 rtl:space-x-reverse"
    //       >
    //         <img
    //           src="https://flowbite.com/docs/images/logo.svg"
    //           className="h-8"
    //           alt="Flowbite Logo"
    //         />
    //         <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
    //           Flowbite
    //         </span>
    //       </a>
    //       <div className="flex items-center md:order-2 space-x-3 md:space-x-0 ">
    //         {/* Headless UI Dropdown Menu */}
    //         <Menu as="div" className="relative">
    //           <div>
    //             <MenuButton className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
    //               <img
    //                 className="w-8 h-8 rounded-full"
    //                 src="./favicon.ico"
    //                 alt="user photo"
    //               />
    //             </MenuButton>
    //           </div>
    //           <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
    //             <div className="px-4 py-3">
    //               <span className="block text-sm text-gray-900 dark:text-white">
    //                 {session?.user?.name || "Guest User"}
    //               </span>
    //               <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
    //                 {session?.user?.email || "user@example.com"}
    //               </span>
    //             </div>
    //             <div className="py-1">
    //               <MenuItem>
    //                 {({ active }) => (
    //                   <a
    //                     href="/dashboard"
    //                     className={`block px-4 py-2 text-sm ${
    //                       active ? "bg-gray-100" : "text-gray-700"
    //                     }`}
    //                   >
    //                     Your Profile
    //                   </a>
    //                 )}
    //               </MenuItem>
    //               <MenuItem>
    //                 {({ active }) => (
    //                   <a
    //                     href="#"
    //                     className={`block px-4 py-2 text-sm ${
    //                       active ? "bg-gray-100" : "text-gray-700"
    //                     }`}
    //                   >
    //                     Settings
    //                   </a>
    //                 )}
    //               </MenuItem>
    //               <MenuItem>
    //                 {({ active }) => (
    //                   <a
    //                     href="#"
    //                     className={`block px-4 py-2 text-sm ${
    //                       active ? "bg-gray-100" : "text-gray-700"
    //                     }`}
    //                   >
    //                     Settings
    //                   </a>
    //                 )}
    //               </MenuItem>
    //             </div>
    //           </MenuItems>
    //         </Menu>

    //         {/* <svg
    //             className="w-5 h-5"
    //             aria-hidden="true"
    //             xmlns="http://www.w3.org/2000/svg"
    //             fill="none"
    //             viewBox="0 0 17 14"
    //           >
    //             <path
    //               stroke="currentColor"
    //               strokeLinecap="round"
    //               strokeLinejoin="round"
    //               strokeWidth="2"
    //               d="M1 1h15M1 7h15M1 13h15"
    //             />
    //           </svg> */}
    //         <Disclosure>
    //           {({ open }) => (
    //             <div className="relative">
    //               <div className={`${open ? "" : "relative"}`}>
    //                 <DisclosureButton
    //                   data-collapse-toggle="navbar-user"
    //                   type="button"
    //                   className={`inline-flex hover:cursor-pointer
    //                      items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700/50 dark:focus:ring-gray-600 transition-colors duration-200 ${
    //                        open ? "hidden" : "relative"
    //                      }`}
    //                   aria-controls="navbar-user"
    //                   aria-expanded={open}
    //                 >
    //                   <span className="sr-only">
    //                     {open ? "Close main menu" : "Open main menu"}
    //                   </span>
    //                   <FontAwesomeIcon
    //                     icon={faBars}
    //                     className="w-5 h-5"
    //                     aria-hidden="true"
    //                   />
    //                 </DisclosureButton>
    //               </div>

    //               <DisclosurePanel
    //                 className={`fixed top-0 right-0 h-full w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-all duration-300 ease-in-out md:hidden z-40 ${
    //                   open ? "translate-x-0" : "translate-x-full"
    //                 }`}
    //               >
    //                 <div className="flex flex-col h-full ">
    //                   <nav className="flex-1 flex-col px-4 py-6 space-y-2 overflow-y-auto">
    //                     <Disclosure>
    //                       {({ open }) => (
    //                         <div>
    //                           <DisclosureButton className="flex items-center w-full py-2 px-3 text-gray-900 rounded-sm justify-between hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
    //                             <span>Home</span>
    //                             <svg
    //                               className={`w-4 h-4 transition-transform duration-200 ${
    //                                 open ? "transform rotate-180" : ""
    //                               }`}
    //                               aria-hidden="true"
    //                               fill="none"
    //                               stroke="currentColor"
    //                               viewBox="0 0 24 24"
    //                               xmlns="http://www.w3.org/2000/svg"
    //                             >
    //                               <path
    //                                 strokeLinecap="round"
    //                                 strokeLinejoin="round"
    //                                 strokeWidth="2"
    //                                 d="M19 9l-7 7-7-7"
    //                               ></path>
    //                             </svg>
    //                           </DisclosureButton>
    //                           <DisclosurePanel className="pl-4 space-y-2">
    //                             <Link
    //                               href="/login"
    //                               className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
    //                             >
    //                               Login
    //                             </Link>
    //                             <Link
    //                               href="/signup"
    //                               className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
    //                             >
    //                               Sign Up
    //                             </Link>
    //                             <Link
    //                               href="/dashboard"
    //                               className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
    //                             >
    //                               Dashboard
    //                             </Link>
    //                           </DisclosurePanel>
    //                         </div>
    //                       )}
    //                     </Disclosure>
    //                     <Link
    //                       href="/about"
    //                       className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
    //                     >
    //                       About
    //                     </Link>
    //                     <Link
    //                       href="/services"
    //                       className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
    //                     >
    //                       Services
    //                     </Link>
    //                     <Link
    //                       href="/pricing"
    //                       className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
    //                     >
    //                       Pricing
    //                     </Link>
    //                     <Link
    //                       href="/contact"
    //                       className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
    //                     >
    //                       Contact
    //                     </Link>
    //                   </nav>
    //                 </div>
    //               </DisclosurePanel>
    //               {/* Add overlay when menu is open */}
    //               {open && (
    //                 <DisclosureButton
    //                   className="fixed inset-0 bg-black bg-opacity-5 transition-opacity md:hidden z-0 cursor-pointer"
    //                   // fixed top-0 right-0 h-full w-64 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg transform transition-all duration-300 ease-in-out md:hidden z-40
    //                   aria-label="Close menu"
    //                 />
    //               )}
    //             </div>
    //           )}
    //         </Disclosure>
    //       </div>
    //       <div
    //         className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
    //         id="navbar-user"
    //       >
    //         <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
    //           <li>
    //             <a
    //               href="#"
    //               className="block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
    //               aria-current="page"
    //             >
    //               Home
    //             </a>
    //           </li>
    //           <li>
    //             <a
    //               href="#"
    //               className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
    //             >
    //               About
    //             </a>
    //           </li>
    //           <li>
    //             <a
    //               href="#"
    //               className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
    //             >
    //               Services
    //             </a>
    //           </li>
    //           <li>
    //             <a
    //               href="#"
    //               className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
    //             >
    //               Pricing
    //             </a>
    //           </li>
    //           <li>
    //             <a
    //               href="#"
    //               className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
    //             >
    //               Contact
    //             </a>
    //           </li>
    //         </ul>
    //       </div>
    //     </div>
    //   </nav>
    // </div>
  );
}
