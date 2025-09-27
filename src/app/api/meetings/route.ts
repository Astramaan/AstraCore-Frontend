
import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";
import { cookies } from 'next/headers';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://astramaan-be-1.onrender.com";

function getAuthHeadersFromCookie(): Record<string, string> {
    const cookieStore = cookies();
    const userDataCookie = cookieStore.get('user-data');
    if (!userDataCookie) {
        return {};
    }

    try {
        const userData = JSON.parse(userDataCookie.value);
        return {
            'x-user': encodeURIComponent(JSON.stringify(userData)),
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

    const res = await fetch(`${API_BASE_URL}/api/v1/meetings`, {
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
    console.error("Create meeting proxy failed:", err);
    return NextResponse.json(
      { success: false, message: "Create meeting proxy failed", details: err.message },
      { status: 500 }
    );
  }
}
