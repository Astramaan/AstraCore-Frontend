
import { NextResponse } from "next/server";
import { cookies } from 'next/headers';

const API_BASE_URL = "https://astramaan-be-1.onrender.com";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const res = await fetch(`${API_BASE_URL}/api/v1/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(data, { status: res.status });
    }

    if (data.success && data.user) {
        cookies().set('user-data', JSON.stringify(data.user), {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'strict',
            path: '/',
        });
    }

    const response = NextResponse.json({ success: data.success, message: data.message });

    return response;
  } catch (err: any) {
    console.error("Login proxy failed:", err);
    return NextResponse.json(
      { success: false, message: "Login proxy failed", details: err.message },
      { status: 500 }
    );
  }
}
