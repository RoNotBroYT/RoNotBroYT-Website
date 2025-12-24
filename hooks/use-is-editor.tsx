import { UserResource } from "@clerk/types";

export function useIsEditor(user?: UserResource | null) {
  // Clerk user object: user?.primaryEmailAddress?.emailAddress
  const email = user?.primaryEmailAddress?.emailAddress;
  return email === "ronotbroyt@icloud.com" || email === "brduck@duck.com";
}
