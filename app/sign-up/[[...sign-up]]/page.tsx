import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { SignUpClient } from "./sign-up-client";

export default async function Page() {
  const { userId } = await auth();

  if (userId) {
    redirect("/");
  }

  return <SignUpClient />;
}
