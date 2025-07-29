// app/api/agent/route.ts
import { NextRequest, NextResponse } from "next/server";
import { runAgent } from "@/lib/agent";

export async function POST(req: NextRequest) {
  try {
    const { emailBody } = await req.json();

    if (!emailBody) {
      return NextResponse.json({ error: "Email body is required" }, { status: 400 });
    }

    const result = await runAgent(emailBody);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Agent error:", error);
    return NextResponse.json({ error: "Failed to process email" }, { status: 500 });
  }
}
