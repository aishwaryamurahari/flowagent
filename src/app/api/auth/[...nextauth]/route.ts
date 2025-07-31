// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth/next";
import { authOptions } from "@/lib/auth";

let handler: ReturnType<typeof NextAuth>;

try {
  handler = NextAuth(authOptions);
} catch (error) {
  console.error('NextAuth initialization error:', error);
  // Return a basic error handler if NextAuth fails to initialize
  handler = async () => {
    console.error('NextAuth handler error:', error);
    return new Response(JSON.stringify({ error: 'Authentication service unavailable' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  };
}

export { handler as GET, handler as POST };
