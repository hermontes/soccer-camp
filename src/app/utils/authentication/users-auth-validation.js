"use server";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export async function signUserIn(data) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (session) {
      redirect("/dashboard");
    }

    return await auth.api.signInEmail({
      body: {
        email: data.email,
        password: data.password,
        rememberMe: false,
      },
    });
  } catch (error) {
    return error;
  }
}

export async function signUpUser(data) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    throw redirect("/dashboard");
  }

  return await auth.api.signUpEmail({
    body: {
      name: data.name,
      email: data.email,
      password: data.password,
    },
  });
}
