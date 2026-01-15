"use client";

import { SignUp } from "@clerk/nextjs";

export function SignUpClient() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <SignUp
        routing="path"
        path="/sign-up"
        signInFallbackRedirectUrl="/sign-in"
      />
    </div>
  );
}
