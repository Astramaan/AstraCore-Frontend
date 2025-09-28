
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
        let userData;
        const cookieValue = userDataCookie.value;
        
        try {
            // First attempt to parse
            userData = JSON.parse(cookieValue);
        } catch (e) {
            // If parsing fails, it might be a double-encoded string
            console.error("Failed to parse user data cookie, trying to parse again", e);
            try {
              userData = JSON.parse(cookieValue);
            } catch (innerError) {
              console.error("Failed to parse double-stringified cookie", innerError);
              return {};
            }
        }
        
        // After potential double-parsing, if it's a string, parse it again.
        if (typeof userData === 'string') {
            try {
                userData = JSON.parse(userData);
            } catch (error) {
                console.error("Final attempt to parse stringified userData failed", error);
                return {};
            }
        }
            
        // Validate the expected structure
        if (!userData || typeof userData !== 'object' || !userData.userId || !userData.email) {
            console.error("Invalid user data structure in cookie", userData);
            return {};
        }
        
        return {
            'x-user': JSON.stringify(userData),
            'x-user-id': userData.userId,
            'x-login-id': userData.email,
        };
    } catch (e) {
        console.error("Error processing user data cookie", e);
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
