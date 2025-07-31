import NextAuth from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

console.log("==== ENV VAR CHECK (NextAuth) ====");
console.log("GOOGLE_CLIENT_ID:", process.env.GOOGLE_CLIENT_ID);
console.log("GOOGLE_CLIENT_SECRET:", process.env.GOOGLE_CLIENT_SECRET);
console.log("NEXTAUTH_SECRET:", process.env.NEXTAUTH_SECRET);
console.log("NEXTAUTH_URL:", process.env.NEXTAUTH_URL);

const handler = NextAuth(authOptions);

export async function GET(req: Request) {
  try {
    return await handler(req);
  } catch (error) {
    console.error("NextAuth GET error:", error);
    return NextResponse.json({ error: "Auth GET failed" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    return await handler(req);
  } catch (error) {
    console.error("NextAuth POST error:", error);
    return NextResponse.json({ error: "Auth POST failed" }, { status: 500 });
  }
}
