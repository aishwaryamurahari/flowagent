"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useState, useEffect, memo } from "react";
import Image from "next/image";

export const AuthButtons = memo(function AuthButtons() {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render anything until mounted to prevent hydration issues
  if (!mounted) {
    return (
      <div className="flex items-center space-x-4">
        <div className="w-20 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
      </div>
    );
  }

  // Show loading state while session is loading
  if (status === "loading") {
    return (
      <div className="flex items-center space-x-4">
        <div className="w-20 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
      </div>
    );
  }

  if (session) {
    return (
      <div className="flex items-center space-x-4">
        <button
          onClick={async () => {
            setLoading(true);
            try {
              await signOut({ redirect: false });
            } catch (error) {
              console.error("Sign out error:", error);
            } finally {
              setLoading(false);
            }
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
    <div className="flex flex-col items-center gap-2 w-full">
      <button
        onClick={async () => {
          setLoading(true);
          try {
            await signIn("google", { redirect: false });
          } catch (error) {
            console.error("Sign in error:", error);
          } finally {
            setLoading(false);
          }
        }}
        className="inline-flex items-center justify-center px-5 py-2 rounded-lg bg-indigo-600 text-white font-semibold shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
        disabled={loading}
      >
        {loading ? (
          <span className="animate-spin mr-2 w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>
        ) : (
          <Image src="/google-icon.png" alt="Google" width={20} height={20} className="mr-2" />
        )}
        Sign in with Google
      </button>
    </div>
  );
});
