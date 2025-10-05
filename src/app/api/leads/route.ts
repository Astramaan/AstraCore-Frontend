
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
        };
    } catch (e) {
        console.error("Failed to parse user cookie", e);
        return {};
    }
}


export async function GET(req: NextRequest) {
  try {
    const authHeaders = getAuthHeadersFromCookie();

    if (Object.keys(authHeaders).length === 0) {
      return NextResponse.json({ success: false, message: "Unauthorized: Missing user data" }, { status: 401 });
    }
    
    const res = await fetch(`${API_BASE_URL}/api/v1/org/leads`, {
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
        return NextResponse.json({ success: false, message: errorBody.message || 'Failed to fetch leads from backend.' }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data, { status: 200 });

  } catch (err: any) {
    console.error("Get leads proxy failed:", err);
    return NextResponse.json(
      { success: false, message: "Get leads proxy failed", details: err.message },
      { status: 500 }
    );
  }
}


export async function POST(req: NextRequest) {
  try {
    const authHeaders = getAuthHeadersFromCookie();

    if (Object.keys(authHeaders).length === 0) {
      return NextResponse.json({ success: false, message: "Unauthorized: Missing user data" }, { status: 401 });
    }
    
    let body;
    try {
        body = await req.json();
        if (!body || typeof body !== 'object') {
            return NextResponse.json({ success: false, message: "Invalid request body" }, { status: 400 });
        }
    } catch (e) {
        return NextResponse.json({ success: false, message: "Invalid JSON in request body" }, { status: 400 });
    }

    const res = await fetch(`${API_BASE_URL}/api/v1/org/invites`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        ...authHeaders
       },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
        let errorBody;
        try {
            errorBody = await res.json();
        } catch (e) {
            errorBody = { message: "An unexpected error occurred on the backend." };
        }
        console.error("Backend error:", errorBody);
        return NextResponse.json({ success: false, message: errorBody.message || 'Failed to create lead.' }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data, { status: 200 });
    
  } catch (err: any) {
    console.error("Create lead proxy failed:", err);
    return NextResponse.json(
      { success: false, message: "Create lead proxy failed", details: err.message },
      { status: 500 }
    );
  }
}
