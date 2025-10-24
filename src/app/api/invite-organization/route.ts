
import { NextResponse } from "next/server";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://astracore-backend.onrender.com/api/v1";

function getAuthHeaders(req: Request): Record<string, string> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  const userHeader = req.headers.get("x-user");

  if (userHeader) {
    try {
      const user = JSON.parse(userHeader);
      headers["x-user"] = userHeader;
      headers["x-user-id"] = user.userId;
    } catch (e) {
      console.error("Failed to parse x-user header", e);
    }
  }
  return headers;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const res = await fetch(`${API_BASE_URL}/invites`, {
      method: "POST",
      headers: getAuthHeaders(req),
      body: JSON.stringify(body),
    });

    const data = await res.json();
    if (!res.ok) {
      return NextResponse.json({ success: false, message: data.message || "Failed to create invitation." }, { status: res.status });
    }

    return NextResponse.json({ success: true, ...data });

  } catch (error) {
    console.error("Invite organization proxy failed:", error);
    return NextResponse.json(
      { success: false, message: "An unexpected error occurred." },
      { status: 500 },
    );
  }
}
