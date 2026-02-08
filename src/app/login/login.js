"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { Eye, EyeOff, Check } from "lucide-react";
import { toast } from "sonner";
import { signUserIn } from "@/app/utils/authentication/users-auth-validation";
import {
  SubmitButton,
  DisplayErrorMessage,
} from "@/components/forms/form-validation";

export default function LogInPage() {
  const [invalidLogin, setInvalidLogin] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const handleLogIn = async (data) => {
    try {
      const response = await signUserIn(data);

      if (response.user) {
        toast("Successfully signed in.", {
          duration: 2000,
          cancel: {
            label: <Check className="w-5 h-5 text-[#4CAF50]" />,
          },
        });
        router.push("/dashboard");
        return;
      }

      toast("Unable to sign in", {
        duration: 7000,
        type: "error",
        position: "bottom-center",
        description: "Please check your credentials or verify your email",
      });
      setInvalidLogin(true);
    } catch (error) {
      console.error("Login failed:", error);
      setInvalidLogin(true);
      toast("Sign in failed", {
        type: "error",
        description: "An unexpected error occurred. Please try again.",
      });
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="!shadow-md w-full max-w-md mt-10 sm:mx-auto sm:w-full sm:max-w-sm md:max-w-md bg-[#FFFFFF] p-[3rem] rounded-md">
        <form
          onSubmit={handleSubmit(handleLogIn)}
          className="space-y-6"
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
            <label
              htmlFor="password"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Password
            </label>
            <div className="mt-2">
              <div className="relative">
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
                  type={showPass ? "text" : "password"}
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
                <button
                  type="button"
                  className="absolute bg-white pt-1.5 pb-1.5 px-0.5 cursor-pointer top-1 right-1 outline-none"
                  onClick={() => setShowPass((prev) => !prev)}
                >
                  <div className="hover:bg-gray-50 px-1 rounded-full">
                    {showPass ? (
                      <EyeOff className="h-4 w-4" aria-hidden="true" />
                    ) : (
                      <Eye className="h-4 w-4" aria-hidden="true" />
                    )}
                  </div>
                </button>
              </div>
              {errors.password && (
                <DisplayErrorMessage message={errors.password.message} />
              )}
            </div>
            {invalidLogin && (
              <div className="pt-3">
                <DisplayErrorMessage message="Email or password is incorrect." />
              </div>
            )}
          </div>

          <div>
            <SubmitButton isSubmitting={isSubmitting} defaultMessage="Log In" />
          </div>
        </form>

        <p className="mt-10 text-center text-sm/6 text-gray-500">
          Not a member?{" "}
          <Link
            href="/signup"
            className="font-semibold text-[#4CAF50] hover:text-[#3e8e41]"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
