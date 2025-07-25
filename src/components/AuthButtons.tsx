"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";
import Image from "next/image";

export function AuthButtons() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

  if (session) {
    return (
      <div className="flex items-center space-x-4">
        {/* <span className="text-sm text-gray-700">Welcome, <span className="font-semibold text-indigo-700">{session.user?.email}</span></span> */}
        <button
          onClick={async () => {
            setLoading(true);
            await signOut();
            setLoading(false);
          }}
          className="inline-flex items-center justify-center px-5 py-2 rounded-lg bg-red-500 text-white font-semibold shadow hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition disabled:opacity-60 disabled:cursor-not-allowed"
          disabled={loading}
          style={{ marginLeft: '8px' }}
        >
          {loading ? (
            <span className="animate-spin mr-2 w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>
          ) : null}
          Sign out
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={async () => {
        setLoading(true);
        await signIn("google");
        setLoading(false);
      }}
      className="inline-flex items-center justify-center px-5 py-2 rounded-lg bg-indigo-600 text-white font-semibold shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
      disabled={loading}
    >
      {loading ? (
        <span className="animate-spin mr-2 w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>
      ) : (
        <Image src="/file.svg" alt="Google" width={20} height={20} className="mr-2" />
      )}
      Sign in with Google
    </button>
  );
}
