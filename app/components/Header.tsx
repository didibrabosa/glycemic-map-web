"use client";

import { UserButton, useUser } from "@clerk/nextjs";

export default function Header() {
  const { user } = useUser();

  return (
    <header className="w-full py-4 px-6 bg-white shadow-sm dark:bg-gray-900 mb-6">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <p className="font-medium mr-3">
          {user?.fullName || user?.primaryEmailAddress?.emailAddress}
        </p>

        <UserButton afterSignOutUrl="/sign-in" />
      </div>
    </header>
  );
}
