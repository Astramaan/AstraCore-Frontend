
import { NextResponse } from "next/server";
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


export async function POST(req: Request) {
  try {
    const authHeaders = getAuthHeadersFromCookie();
    
    if (Object.keys(authHeaders).length === 0 || !authHeaders['x-user-id']) {
      return NextResponse.json({ success: false, message: "Unauthorized: Missing user data" }, { status: 401 });
    }

    const body = await req.json();

    if (!body || !body.email || !body.role) {
      return NextResponse.json({ success: false, message: "Invalid request body: email and role are required." }, { status: 400 });
    }

    const res = await fetch(`${API_BASE_URL}/api/v1/signuplink`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        ...authHeaders 
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    
    if (!res.ok) {
        return NextResponse.json({ success: false, message: data.message || "Failed to send invitation." }, { status: res.status });
    }

    return NextResponse.json(data, { status: res.status });
    
  } catch (err: any) {
    console.error("Invite proxy failed:", err);
    return NextResponse.json(
      { success: false, message: "Invite proxy failed", details: err.message },
      { status: 500 }
    );
  }
}
