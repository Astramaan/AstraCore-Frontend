
import { NextResponse } from "next/server";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://astracore-backend.onrender.com/api/v1";

function getAuthHeaders(req: Request): Record<string, string> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  const userHeader = req.headers.get("x-user");
  const authHeader = req.headers.get("authorization");

  if (authHeader) {
    headers["Authorization"] = authHeader;
  }

  if (!userHeader) {
    console.warn("x-user header is missing in request to /api/invites");
    return headers;
  }

  try {
    const user = JSON.parse(userHeader);
    headers["x-user"] = userHeader;
    headers["x-user-id"] = user.userId;
    headers["x-login-id"] = user.email;
    headers["x-organization-id"] = user.organizationId;
    return headers;
  } catch (error) {
    console.error("Failed to parse x-user header:", error);
    return headers;
  }
}

export async function GET(req: Request) {
  try {
    const res = await fetch(`${API_BASE_URL}/get-invites`, {
      headers: getAuthHeaders(req),
    });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error("Get invites proxy failed:", error);
    return NextResponse.json(
      { success: false, message: "An unexpected error occurred." },
      { status: 500 },
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Invite ID is required." },
        { status: 400 },
      );
    }

    const res = await fetch(`${API_BASE_URL}/invites/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(req),
    });

    if (res.status === 204 || !res.body) {
      return new NextResponse(null, { status: 204 });
    }

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error("Delete invite proxy failed:", error);
    return NextResponse.json(
      { success: false, message: "An unexpected error occurred." },
      { status: 500 },
    );
  }
}
