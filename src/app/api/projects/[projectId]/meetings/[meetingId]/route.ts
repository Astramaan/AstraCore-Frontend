import { NextResponse, NextRequest } from "next/server";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://astramaan-be-1.onrender.com";

function getAuthHeaders(req: NextRequest): Record<string, string> {
  const userHeader = req.headers.get("x-user");
  if (!userHeader) {
    console.warn(
      "x-user header is missing in request to /api/projects/[projectId]/meetings/[meetingId]",
    );
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

export async function PATCH(
  req: NextRequest,
  { params }: { params: { projectId: string; meetingId: string } },
) {
  try {
    const body = await req.json();
    const res = await fetch(
      `${API_BASE_URL}/api/v1/org/projects/${params.projectId}/meetings/${params.meetingId}`,
      {
        method: "PATCH",
        headers: getAuthHeaders(req),
        body: JSON.stringify(body),
      },
    );
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error("Update meeting proxy failed:", error);
    return NextResponse.json(
      { success: false, message: "An unexpected error occurred." },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { projectId: string; meetingId: string } },
) {
  try {
    const res = await fetch(
      `${API_BASE_URL}/api/v1/org/projects/${params.projectId}/meetings/${params.meetingId}`,
      {
        method: "DELETE",
        headers: getAuthHeaders(req),
      },
    );

    const text = await res.text();
    const data = text ? JSON.parse(text) : {};

    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error("Delete meeting proxy failed:", error);
    return NextResponse.json(
      { success: false, message: "An unexpected error occurred." },
      { status: 500 },
    );
  }
}
