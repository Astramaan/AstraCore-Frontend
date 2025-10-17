import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://astracore-backend.onrender.com/api/v1";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    const res = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    // Check if the response is ok and the content-type is JSON
    const contentType = res.headers.get("content-type");
    if (!res.ok || !contentType || !contentType.includes("application/json")) {
      const errorText = await res.text();
      console.error("Login proxy failed: Non-JSON response from backend.", {
        status: res.status,
        statusText: res.statusText,
        body: errorText,
      });
      return NextResponse.json(
        {
          success: false,
          message: `The server sent an unexpected response. Status: ${res.status}`,
        },
        { status: 502 }, // Bad Gateway
      );
    }

    const data = await res.json();

    if (res.ok && data.success && data.user) {
      const cookieStore = cookies();
      cookieStore.set("astramaan_user", JSON.stringify(data.user), {
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
