"use client";
import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/nextjs";

export function UserStatus() {
  return (
    <div className="flex items-center gap-2">
      <SignedIn>
        <UserButton afterSignOutUrl="/" />
      </SignedIn>
      <SignedOut>
        <SignInButton mode="modal">
          <button className="px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-600">Sign In</button>
        </SignInButton>
      </SignedOut>
    </div>
  );
}
