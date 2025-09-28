
import { NextResponse } from "next/server";
import { cookies } from 'next/headers';
import type { NextRequest } from 'next/server';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://astramaan-be-1.onrender.com";

function getAuthHeadersFromCookie(): Record<string, string> {
    const cookieStore = cookies();
    const userDataCookie = cookieStore.get('user-data');
    if (!userDataCookie) {
        return {};
    }

    try {
        let userData = JSON.parse(userDataCookie.value);
        // Handle cases where the cookie is double-stringified
        if (typeof userData === 'string') {
            userData = JSON.parse(userData);
        }
        
        return {
            'x-user': JSON.stringify(userData),
            'x-user-id': userData.userId,
            'x-login-id': userData.email,
        };
    } catch (e) {
        console.error("Failed to parse user data cookie", e);
        return {};
    }
}


export async function POST(req: NextRequest) {
  try {
    const authHeaders = getAuthHeadersFromCookie();
    
    if (Object.keys(authHeaders).length === 0 || !authHeaders['x-user-id']) {
      return NextResponse.json({ success: false, message: "Unauthorized: Missing user data" }, { status: 401 });
    }

    const body = await req.json();

    const res = await fetch(`${API_BASE_URL}/api/v1/signuplink`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        ...authHeaders 
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    return NextResponse.json(data, { status: res.status });
    
  } catch (err: any) {
    console.error("Invite proxy failed:", err);
    return NextResponse.json(
      { success: false, message: "Invite proxy failed", details: err.message },
      { status: 500 }
    );
  }
}

    
