
import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";
import { cookies } from 'next/headers';

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
            'x-organization-id': userData.organizationId,
        };
    } catch (e) {
        console.error("Failed to parse user cookie", e);
        return {};
    }
}

export async function GET(req: NextRequest) {
  try {
    const authHeaders = getAuthHeadersFromCookie();

    if (Object.keys(authHeaders).length === 0 || !authHeaders['x-user-id']) {
      return NextResponse.json({ success: false, message: "Unauthorized: Missing user data" }, { status: 401 });
    }

    const res = await fetch(`${API_BASE_URL}/api/v1/org/projects`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...authHeaders
      },
    });

    if (!res.ok) {
        let errorBody;
        try {
            errorBody = await res.json();
        } catch (e) {
            errorBody = { message: "An unexpected error occurred on the backend." };
        }
        console.error("Backend error:", errorBody);
        return NextResponse.json({ success: false, message: errorBody.message || 'Failed to fetch projects from backend.' }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data, { status: 200 });

  } catch (err: any) {
    console.error("Get projects proxy failed:", err);
    return NextResponse.json(
      { success: false, message: "Get projects proxy failed", details: err.message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const authHeaders = getAuthHeadersFromCookie();

    if (Object.keys(authHeaders).length === 0 || !authHeaders['x-user-id']) {
      return NextResponse.json({ success: false, message: "Unauthorized: Missing user data" }, { status: 401 });
    }
    
    const body = await req.json();

    const res = await fetch(`${API_BASE_URL}/api/v1/org/projects`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        ...authHeaders
       },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    
    if (!res.ok) {
        return NextResponse.json({ success: false, message: data.message || "Failed to create project." }, { status: res.status });
    }

    return NextResponse.json(data, { status: res.status });
    
  } catch (err: any) {
    console.error("Create project proxy failed:", err);
    return NextResponse.json(
      { success: false, message: "Create project proxy failed", details: err.message },
      { status: 500 }
    );
  }
}
