"use client";

import { SignIn } from "@clerk/nextjs";

export function SignInClient() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <SignIn
        routing="path"
        path="/sign-in"
        signUpFallbackRedirectUrl="/sign-up"
      />
    </div>
  );
}
