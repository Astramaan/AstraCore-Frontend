
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

export async function PATCH(req: NextRequest) {
  try {
    const authHeaders = getAuthHeadersFromCookie();

    if (Object.keys(authHeaders).length === 0 || !authHeaders['x-user-id']) {
      return NextResponse.json({ success: false, message: "Unauthorized: Missing user data" }, { status: 401 });
    }
    
    const body = await req.json();

    const res = await fetch(`${API_BASE_URL}/api/v1/updateProfile`, {
      method: "PATCH",
      headers: { 
        "Content-Type": "application/json",
        ...authHeaders
       },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    
    if (!res.ok) {
        return NextResponse.json({ success: false, message: data.message || "Failed to update profile." }, { status: res.status });
    }

    // Also update the cookie
    const cookieStore = cookies();
    const userCookie = cookieStore.get('astramaan_user');
    if(userCookie) {
        const userData = JSON.parse(userCookie.value);
        const updatedUserData = { ...userData, ...body };
        cookieStore.set('astramaan_user', JSON.stringify(updatedUserData), {
            path: '/',
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
        });
    }


    return NextResponse.json(data, { status: res.status });
    
  } catch (err: any) {
    console.error("Update profile proxy failed:", err);
    return NextResponse.json(
      { success: false, message: "Update profile proxy failed", details: err.message },
      { status: 500 }
    );
  }
}
