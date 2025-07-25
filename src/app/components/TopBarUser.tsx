"use client";
import { useSession } from "next-auth/react";
import { AuthButtons } from "@/components/AuthButtons";

export default function TopBarUser() {
  const { data: session } = useSession();
  return (
    <div className="flex items-center space-x-4">
      {session && (
        <span className="text-sm text-gray-700">Welcome, <span className="font-semibold text-indigo-700">{session.user?.email}</span>!</span>
      )}
      <AuthButtons />
    </div>
  );
}