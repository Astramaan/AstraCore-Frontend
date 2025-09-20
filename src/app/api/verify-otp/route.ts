
import { NextResponse } from "next/server";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://astramaan-be-1.onrender.com";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // The user wants to use /api/v1/email-verification here.
    // The previous endpoint was /api/v1/verify-email.
    const res = await fetch(`${API_BASE_URL}/api/v1/email-verification`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    return NextResponse.json(data, { status: res.status });
    
  } catch (err: any) {
    console.error("Verify OTP proxy failed:", err);
    return NextResponse.json(
      { success: false, message: "Verify OTP proxy failed", details: err.message },
      { status: 500 }
    );
  }
}
