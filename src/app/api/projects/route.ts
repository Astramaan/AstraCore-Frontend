
import { NextResponse } from "next/server";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://astracore-backend.onrender.com/api/v1";

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

function getUserIdFromRequest(req: Request): string | null {
    const userHeader = req.headers.get("x-user");
    if (!userHeader) return null;
    try {
        const user = JSON.parse(userHeader);
        return user.userId || null;
    } catch {
        return null;
    }
}

export async function GET(req: Request) {
  try {
    const res = await fetch(`${API_BASE_URL}/org/projects`, {
      headers: getAuthHeaders(req),
    });
    const data = await res.json();
    // The backend returns projects under the 'projects' key.
    // We remap it to 'data' for the frontend.
    if (data.success) {
      return NextResponse.json({ success: true, data: data.projects }, { status: res.status });
    }
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
    const userId = getUserIdFromRequest(req);

    if (!userId) {
        return NextResponse.json({ success: false, message: "Unauthorized: User ID is missing." }, { status: 401 });
    }

    // Add the createdBy field and ensure siteAddress is included
    const payload = {
        ...body,
        projectDetails: {
          ...body.projectDetails,
          siteAddress: body.projectDetails.siteLocation 
        },
        createdBy: userId,
    };

    const res = await fetch(`${API_BASE_URL}/org/projects`, {
      method: "POST",
      headers: getAuthHeaders(req),
      body: JSON.stringify(payload),
    });

    const text = await res.text();
    if (!text) {
      // Handle cases where backend sends no body on success
      if (res.ok) {
        return new NextResponse(JSON.stringify({ success: true, message: "Project created successfully" }), { status: 201 });
      }
      return NextResponse.json({ success: false, message: 'Empty response from server' }, { status: res.status });
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
