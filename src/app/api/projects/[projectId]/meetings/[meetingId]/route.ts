
import { NextResponse, type NextRequest } from "next/server";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://astramaan-be-1.onrender.com";

function getAuthHeadersFromCookie(): Record<string, string> {
  const staticUserData = {
    userId: "8c26c0b3032ecc4f",
    name: "saras",
    email: "saras@gmail.com",
    role: "ORG_ADMIN",
    mobileNumber: "9876543210",
    city: "Delhi",
    organizationId: "ORG-f9705032-d42a-46df-b799-87bcda629142",
    orgCode: "ABCConstructionsDEL"
  };

 return {
    'x-user': JSON.stringify(staticUserData),
    'x-user-id': staticUserData.userId,
    'x-login-id': staticUserData.email,
  };
}
export async function PATCH(
  req: Request,
  { params }: { params: { projectId: string; meetingId: string } }
) {
  const { projectId, meetingId } = params;
  try {
    const authHeaders = getAuthHeadersFromCookie();
    if (!authHeaders['x-user-id']) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    const res = await fetch(`${API_BASE_URL}/api/v1/org/projects/${projectId}/meetings/${meetingId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...authHeaders,
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json({ success: false, message: data.message || "Failed to update meeting" }, { status: res.status });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { projectId: string; meetingId: string } }
) {
  const { projectId, meetingId } = params;

  try {
    const authHeaders = getAuthHeadersFromCookie();
    if (!authHeaders['x-user-id']) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const res = await fetch(`${API_BASE_URL}/api/v1/org/projects/${projectId}/meetings/${meetingId}`, {
      method: 'DELETE',
      headers: authHeaders,
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json({ success: false, message: data.message || "Failed to delete meeting" }, { status: res.status });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
