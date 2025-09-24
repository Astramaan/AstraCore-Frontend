
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
        const userData = JSON.parse(userDataCookie.value);
        const headers: Record<string, string> = {};
        const userHeaders = ['userId', 'name', 'email', 'role', 'mobileNumber', 'city', 'organizationId', 'orgCode', 'team', 'roleType'];
        
        userHeaders.forEach(headerKey => {
            if (userData[headerKey]) {
                headers[headerKey] = String(userData[headerKey]);
            }
        });
        headers['x-user-id'] = userData.userId;
        headers['x-login-id'] = userData.email;
        return headers;
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
