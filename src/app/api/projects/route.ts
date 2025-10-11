import { NextResponse } from "next/server";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://astramaan-be-1.onrender.com";

function getAuthHeaders(req: Request): Record<string, string> {
  const userHeader = req.headers.get("x-user");
  if (!userHeader) {
    console.warn("x-user header is missing in request to /api/projects");
    return { "Content-Type": "application/json" };
  }

  try {
    const user = JSON.parse(userHeader);
    return {
      "Content-Type": "application/json",
      "x-user": userHeader,
      "x-user-id": user.userId,
      "x-login-id": user.email,
      "x-organization-id": user.organizationId,
    };
  } catch (error) {
    console.error("Failed to parse x-user header:", error);
    return { "Content-Type": "application/json" };
  }
}

export async function GET(req: Request) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/v1/org/projects`, {
      headers: getAuthHeaders(req),
    });
    const data = await res.json();
    // The page component expects the data property to be the array of projects
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error("Get projects proxy failed:", error);
    return NextResponse.json(
      { success: false, message: "An unexpected error occurred." },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const res = await fetch(`${API_BASE_URL}/api/v1/org/projects`, {
      method: "POST",
      headers: getAuthHeaders(req),
      body: JSON.stringify(body),
    });

    const text = await res.text();
    if (!text) {
      return new NextResponse(null, { status: res.status });
    }

    const data = JSON.parse(text);
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error("Add project proxy failed:", error);
    return NextResponse.json(
      { success: false, message: "An unexpected error occurred." },
      { status: 500 },
    );
  }
}
