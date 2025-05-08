"use client";

import { useRouter } from "next/navigation";
import { signUserIn } from "@/app/utils/authentication/users-auth";
import Link from "next/link";
import { useForm } from "react-hook-form";
import {
  SubmitButton,
  DisplayErrorMessage,
} from "@/components/forms/form-validation";
import { useState } from "react";

export default function LogInPage() {
  const [invalidLogin, setInvalidLogin] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    getValues,
    watch, //checking for input values
    resetField,
  } = useForm();

  const router = useRouter();

  const handleLogIn = async (data) => {
    await signUserIn(data)
      .then((response) => {
        if (response) {
          console.log("success: ", response);
          setInvalidLogin(false);
          reset();
          router.push("/dashboard");
        } else {
          setInvalidLogin(true);
        }
      })
      .catch((error) => {
        console.log("Error while trying to login: ", error);
        setInvalidLogin(true);
      });
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          {/* <img
            alt="Your Company"
            src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
            className="mx-auto h-10 w-auto"
          /> */}
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="!shadow-md w-full max-w-md mt-10 sm:mx-auto sm:w-full sm:max-w-sm md:max-w-md bg-[#FFFFFF] p-[3rem] rounded-md ">
          <form
            onSubmit={handleSubmit((data) => handleLogIn(data))}
            // onSubmit={handleSubmit((data) => sendFormToServer(data))}
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
                  {...register("email", {
                    required: "Please enter your email",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: "Email must be formatted correctly.",
                    },
                  })}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
                {errors.email && (
                  <DisplayErrorMessage message={errors.email.message} />
                )}
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
                  {...register("password", {
                    required: "Please enter your password",
                    minLength: {
                      value: 8,
                      message: "Minimum length of 8 characters required",
                    },
                    maxLength: {
                      value: 80,
                      message: "Exceeded maximum length of 80 characters",
                    },
                  })}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
                {errors.password && (
                  <DisplayErrorMessage message={errors.password.message} />
                )}
              </div>
            </div>
            {invalidLogin && (
              <DisplayErrorMessage message={"Email or password is incorrect"} />
            )}
            <div>
              <SubmitButton
                isSubmitting={isSubmitting}
                defaultMessage={"Log In"}
                pendingMessage={"Logging In.."}
              />
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
