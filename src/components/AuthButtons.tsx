"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export function AuthButtons() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="text-sm text-right">
        <p>Signed in as {session.user?.email}</p>
        <button onClick={() => signOut()} className="text-red-500 underline">
          Sign out
        </button>
      </div>
    );
  }

  return (
    <button onClick={() => signIn("google")} className="text-blue-600 underline">
      Sign in with Google
    </button>
  );
}
