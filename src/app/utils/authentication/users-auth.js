"use server";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

import { authClient } from "@/lib/auth-client";

// export const signUserOut = async () => {
//   const successSignOut = await authClient.signOut()

//   //if they attempt to sign in while there's already a session in this browser, we forbid it and force them to the dashboard
//   if (!successSignOut) {
//     throw "No success"
//   } else {
//     // console.log((await session).user.name)
//     return successSignOut
//   }
// };

export const signUserIn = async (data) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  //if they attempt to sign in while there's already a session in this browser, we forbid it and force them to the dashboard
  if (!session) {
    return await auth.api.signInEmail({
      body: {
        email: data.email,
        password: data.password,
        rememberMe: false
      },
    });
  } else {
    // console.log((await session).user.name)
    throw redirect("/dashboard");
  }
};

export const signUpUser = async (data) => {

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  //if they attempt to sign up while there's already a session in this browser, we forbid it and force them to the dashboard
  if (!session) {
    const response = await auth.api.signUpEmail({
      body: {
        name: data.name,
        email: data.email,
        password: data.password,
      },
    });

    return response;
    // const rtnResponse = {
    //   statusCode: 200,

    // }
    // return rtnResponse;
  } else {
    // console.log((await session).user.name)
    throw redirect("/dashboard");
  }
};
