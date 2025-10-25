
import { NextResponse } from "next/server";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://astracore-backend.onrender.com/api/v1";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const res = await fetch(`${API_BASE_URL}/change-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        { success: false, message: data.message || "Failed to change password" },
        { status: res.status },
      );
    }

    return NextResponse.json({ success: true, ...data });
  } catch (error) {
    console.error("Change password proxy failed:", error);
    return NextResponse.json(
      { success: false, message: "An unexpected error occurred." },
      { status: 500 },
    );
  }
}
