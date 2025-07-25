"use client";
import { useSession } from "next-auth/react";
import { AuthButtons } from "@/components/AuthButtons";
import ThemeToggle from "@/components/ThemeToggle";

export default function TopBarUser() {
  const { data: session, status } = useSession();

  return (
    <div className="flex items-center space-x-4">
      {status === "loading" ? (
        <div className="w-48 h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
      ) : session ? (
        <span className="text-sm text-gray-700 dark:text-gray-300">
          Welcome, <span className="font-semibold text-indigo-700 dark:text-indigo-300">{session.user?.email}</span>!
        </span>
      ) : null}
      <AuthButtons />
      <ThemeToggle />
    </div>
  );
}