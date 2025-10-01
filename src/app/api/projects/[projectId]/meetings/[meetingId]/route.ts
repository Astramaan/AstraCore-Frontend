
import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";
import { cookies } from 'next/headers';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://astramaan-be-1.onrender.com";

function getAuthHeadersFromCookie(): Record<string, string> {
    const staticUserData = {
        "userId": "8c26c0b3032ecc4f",
        "name": "saras",
        "email": "saras@gmail.com",
        "role": "ORG_ADMIN",
        "mobileNumber": "9876543210",
        "city": "Delhi",
        "organizationId": "ORG-f9705032-d42a-46df-b799-87bcda629142",
        "orgCode": "ABCConstructionsDEL"
    };

    return {
        'x-user': JSON.stringify(staticUserData),
        'x-user-id': staticUserData.userId,
        'x-login-id': staticUserData.email,
    };
}

interface RouteParams {
  params: {
    projectId: string;
    meetingId: string;
  };
}

export async function PATCH(
  req: NextRequest,
  { params }: RouteParams
) {
  const { projectId, meetingId } = params;
  try {
    const authHeaders = getAuthHeadersFromCookie();
    if (Object.keys(authHeaders).length === 0 || !authHeaders['x-user-id']) {
      return NextResponse.json({ success: false, message: "Unauthorized: Missing user data" }, { status: 401 });
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

    if (!res.ok) {
      let errorBody;
      try {
        errorBody = await res.json();
      } catch (e) {
        errorBody = { message: 'An unexpected error occurred on the backend.' };
      }
      console.error('Backend error on meeting update:', errorBody);
      return NextResponse.json({ success: false, message: errorBody.message || 'Failed to update meeting.' }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data, { status: 200 });

  } catch (err: any) {
    console.error(`Update meeting proxy failed for meeting ${meetingId}:`, err);
    return NextResponse.json(
      { success: false, message: 'Update meeting proxy failed', details: err.message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: RouteParams
) {
  const { projectId, meetingId } = params;
  try {
    const authHeaders = getAuthHeadersFromCookie();
    if (Object.keys(authHeaders).length === 0 || !authHeaders['x-user-id']) {
      return NextResponse.json({ success: false, message: "Unauthorized: Missing user data" }, { status: 401 });
    }

    const res = await fetch(`${API_BASE_URL}/api/v1/org/projects/${projectId}/meetings/${meetingId}`, {
      method: 'DELETE',
      headers: {
        ...authHeaders,
      },
    });

    if (!res.ok) {
      let errorBody;
      try {
        errorBody = await res.json();
      } catch (e) {
        errorBody = { message: 'An unexpected error occurred on the backend.' };
      }
      console.error('Backend error on meeting deletion:', errorBody);
      return NextResponse.json({ success: false, message: errorBody.message || 'Failed to delete meeting.' }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data, { status: 200 });

  } catch (err: any) {
    console.error(`Delete meeting proxy failed for meeting ${meetingId}:`, err);
    return NextResponse.json(
      { success: false, message: 'Delete meeting proxy failed', details: err.message },
      { status: 500 }
    );
  }
}
