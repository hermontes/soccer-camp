"use client";

import { useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";
import { signUserIn } from "@/lib/server-auth/users-auth";
import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import Link from "next/link";

export default function LogInPage() {
  const [connMessage, setConnMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  //Temp tester of local DB
  // const testConnection = async () => {
  //   try {
  //     const res = await fetch("/api/test-pg");
  //     const data = await res.json();
  //
  // };

  function SubmitButton() {
    const { pending } = useFormStatus();

    return (
      <button
        disabled={pending}
        type="submit"
        className={`flex w-full justify-center rounded-md  px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${
          pending
            ? `bg-indigo-300`
            : `bg-indigo-600 hover:bg-indigo-500 cursor-pointer`
        } `}
      >
        {pending ? "Signining in.." : "Sign In"}
      </button>
    );
  }

  const signUpConnection = async (event) => {
    event.preventDefault();
    try {
      const data = await signUserIn(email, password);

      console.log("✅ Login success: ", data);
      router.push("/dashboard");
      // console.log("The error message: ", error);
    } catch (error) {
      //ALERT: the username or pass was wrong
      console.log("Error logging in: ", error);
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        {/* <div className="!shadow-[0px_0px_3px_gray]">Test</div> */}
        <div className="!shadow-md w-full max-w-md mt-10 sm:mx-auto sm:w-full sm:max-w-sm md:max-w-md bg-[#FFFFFF] p-[3rem] rounded-md ">
          <form
            onSubmit={signUpConnection}
            method="POST"
            className="space-y-6 "
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <SubmitButton />
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Not a member?{" "}
            <Link
              href="/signup"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
