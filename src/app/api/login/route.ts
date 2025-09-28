
import { NextResponse } from "next/server";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://astramaan-be-1.onrender.com";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body || !body.email || !body.password) {
        return NextResponse.json({ success: false, message: "Email and password are required." }, { status: 400 });
    }

    // forward to backend
    const res = await fetch(`${API_BASE_URL}/api/v1/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (!res.ok) {
        return NextResponse.json({ success: false, message: data.message || 'Login failed.' }, { status: res.status });
    }

    return NextResponse.json(data, { status: res.status });
  } catch (err: any) {
    console.error("Login proxy failed:", err);
    return NextResponse.json(
      { success: false, message: "Login proxy failed", details: err.message },
      { status: 500 }
    );
  }
}
