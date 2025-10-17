import { NextResponse } from "next/server";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://astracore-backend.onrender.com/api/v1";

function getAuthHeaders(req: Request): Record<string, string> {
  const userHeader = req.headers.get("x-user");
  if (!userHeader) {
    console.warn("x-user header is missing in request to /api/leads/by-email");
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
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
        return NextResponse.json({ success: false, message: "Email query parameter is required." }, { status: 400 });
    }

    const res = await fetch(
      `${API_BASE_URL}/org/lead-by-email?email=${encodeURIComponent(email)}`,
      {
        method: "GET",
        headers: getAuthHeaders(req),
      },
    );

    const data = await res.json();
    
    // Remap the backend's 'lead' key to 'data' for the frontend
    if (data.success && data.lead) {
      return NextResponse.json({ success: true, data: data.lead }, { status: res.status });
    }

    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error("Get lead by email proxy failed:", error);
    return NextResponse.json(
      { success: false, message: "An unexpected error occurred." },
      { status: 500 },
    );
  }
}
