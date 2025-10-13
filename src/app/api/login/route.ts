import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://astramaan-be-1.onrender.com";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    const res = await fetch(`${API_BASE_URL}/api/v1/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok && data.success && data.user) {
      const cookieStore = cookies();
      cookieStore.set("user-data", JSON.stringify(data.user), {
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 1 week
      });
      // The backend returns the user object directly in the 'user' property.
      return NextResponse.json({ success: true, user: data.user });
    } else {
      return NextResponse.json(
        { success: false, message: data.message || "Login failed" },
        { status: res.status },
      );
    }
  } catch (error) {
    console.error("Login proxy failed:", error);
    return NextResponse.json(
      { success: false, message: "An unexpected error occurred." },
      { status: 500 },
    );
  }
}
