
import { NextResponse, type NextRequest } from "next/server";
import { cookies } from "next/headers";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://astramaan-be-1.onrender.com";

function getAuthHeadersFromCookie(): Record<string, string> {
  const cookieStore = cookies();
  const userCookie = cookieStore.get('astramaan_user');
  if (!userCookie) return {};
  
  try {
      const userData = JSON.parse(userCookie.value);
      return {
          'x-user': JSON.stringify(userData),
          'x-user-id': userData.userId,
          'x-login-id': userData.email,
      };
  } catch (e) {
      console.error("Failed to parse user cookie", e);
      return {};
  }
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
