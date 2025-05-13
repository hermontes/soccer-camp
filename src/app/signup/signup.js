"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { signUpUser } from "@/app/utils/authentication/users-auth";
import {
  SubmitButton,
  DisplayErrorMessage,
} from "@/components/forms/form-validation";
import Link from "next/link";


export default function SignUpPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    getValues,
    watch, //checking for password match
    resetField,
  } = useForm();

  // const formatErrorMessage = (issues) => {

  // };

  const sendFormToServer = async (data) => {
    // event.preventDefault();

    await signUpUser(data)
      .then((res) => {
        if (res) {
          console.log(res);
        }
        router.push("/dashboard");
        reset();
      })
      .catch((error) => {
        if (error) {
          //TODO: message: Sign in to this account or enter an email address that isn't already in use.


          console.log(error);
        }
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
            Sign up to create an account
          </h2>
        </div>

        {/* <div className="!shadow-[0px_0px_3px_gray]">Test</div> */}
        <div className="!shadow-md w-full max-w-md mt-10 sm:mx-auto sm:w-full sm:max-w-sm md:max-w-md bg-[#FFFFFF] p-[3rem] rounded-md ">
          <form
            onSubmit={handleSubmit((data) => sendFormToServer(data))}
            method="POST"
            className="space-y-6 "
          >
            <div>
              <label
                htmlFor="name"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  //register returns props so we spread them by ...
                  {...register("name", {
                    required: "Please enter your name",
                    minLength: {
                      value: 2,
                      message: "Minimum length of 2 characters required",
                    },
                    maxLength: { value: 80, message: "Max len reached" },
                  })}
                  name="name"
                  type="text"
                  // onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
                {errors.name && (
                  <DisplayErrorMessage message={errors.name.message} />
                )}
              </div>
            </div>
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
                    required: "Please enter an email address",
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
              </div>
              <div className="mt-2">
                <input
                  {...register("password", {
                    required: "Please enter a password",
                    // minLength: {
                    //   value: 8,
                    //   message: "Minimum length of 8 characters required",
                    // },
                    maxLength: {
                      value: 80,
                      message: "Maximum length of 80 characters",
                    },
                    validate: (val) => {
                      // Check for at least one letter and one number
                      const hasCapitalLetter = /[A-Z]/.test(val);
                      const hasSmallLetter = /[a-z]/.test(val);
                      const hasNumber = /[0-9]/.test(val);

                      const issues = [];
                      if (!hasCapitalLetter) issues.push("- A capital letter");
                      if (!hasSmallLetter) issues.push("- A small letter");
                      if (!hasNumber) issues.push("- A number");
                      if (issues.length > 0) {
                        let message = "Password must contain:\n";
                        issues.forEach((elem) => {
                          message += ` ${elem}\n`;
                        });
                        return message;
                      }
                      return true;
                    },
                  })}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
                {errors.password && (

                    <DisplayErrorMessage
                      message={errors.password.message}
                    ></DisplayErrorMessage>

                )}
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Confirm Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  {...register("confirmPassword", {
                    required: "Confirm your password",
                    validate: (val) => {
                      return getValues("password") === val || "Passwords do not match. Try again."

                    },
                  })}
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
                {errors.confirmPassword && (
                  <>
                  <DisplayErrorMessage
                    message={errors.confirmPassword.message}
                  />
                 </>
                )}
              </div>
            </div>
            <div>
              <SubmitButton
                isSubmitting={isSubmitting}
                defaultMessage={"Sign Up"}
              />
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Already a member?{" "}
            <Link
              href="/login"
              className="font-semibold text-[#4CAF50] hover:text-[#3e8e41]"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
