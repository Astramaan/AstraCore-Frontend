
import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";
import { cookies } from 'next/headers';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://astramaan-be-1.onrender.com";

function getAuthHeadersFromCookie(): Record<string, string> {
    const cookieStore = cookies();
    const userDataCookie = cookieStore.get('user-data');
    if (!userDataCookie) {
        console.error("Auth cookie not found");
        return {};
    }

    let cookieValue = userDataCookie.value;
    
    try {
        // First, try to decode it, in case it's URL-encoded
        cookieValue = decodeURIComponent(cookieValue);
    } catch (e) {
        // If it fails, it's probably not encoded, so we can continue
    }
    
    let userData: any;
    try {
        userData = JSON.parse(cookieValue);
    } catch (e) {
        console.error("Failed to parse user data cookie as JSON:", e);
        return {};
    }

    // Handle cases where the parsed data is *still* a string (double-encoded JSON)
    if (typeof userData === 'string') {
        try {
            userData = JSON.parse(userData);
        } catch (e2) {
            console.error("Failed to parse double-stringified user data:", e2);
            return {};
        }
    }
    
    // Final validation
    if (!userData || typeof userData !== 'object' || !userData.userId || !userData.email) {
        console.error("Invalid user data structure in cookie after parsing:", userData);
        return {};
    }
    
    return {
        'x-user': JSON.stringify(userData),
        'x-user-id': userData.userId,
        'x-login-id': userData.email,
    };
}

export async function GET(req: NextRequest) {
  try {
    const authHeaders = getAuthHeadersFromCookie();

    if (Object.keys(authHeaders).length === 0 || !authHeaders['x-user-id']) {
      return NextResponse.json({ success: false, message: "Unauthorized: Missing user data" }, { status: 401 });
    }

    const res = await fetch(`${API_BASE_URL}/api/v1/org-users`, {
      method: "GET",
      headers: { 
        "Content-Type": "application/json",
        ...authHeaders
       },
    });

    const data = await res.json();
    
    if (!res.ok) {
        return NextResponse.json({ success: false, message: data.message || "Failed to fetch users." }, { status: res.status });
    }

    return NextResponse.json(data, { status: res.status });
    
  } catch (err: any) {
    console.error("Get users proxy failed:", err);
    return NextResponse.json(
      { success: false, message: "Get users proxy failed", details: err.message },
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
    
    if (!body || !body.name || !body.email || !body.mobileNumber) {
        return NextResponse.json({ success: false, message: "Invalid request: name, email, and mobile number are required." }, { status: 400 });
    }

    const res = await fetch(`${API_BASE_URL}/api/v1/invite`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        ...authHeaders
       },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (!res.ok) {
        return NextResponse.json({ success: false, message: data.message || "Failed to add member." }, { status: res.status });
    }

    return NextResponse.json(data, { status: res.status });
    
  } catch (err: any) {
    console.error("Add user proxy failed:", err);
    return NextResponse.json(
      { success: false, message: "Add user proxy failed", details: err.message },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const authHeaders = getAuthHeadersFromCookie();

    if (Object.keys(authHeaders).length === 0 || !authHeaders['x-user-id']) {
      return NextResponse.json({ success: false, message: "Unauthorized: Missing user data" }, { status: 401 });
    }
    
    const body = await req.json();

    const res = await fetch(`${API_BASE_URL}/api/v1/org-users`, {
      method: "PATCH",
      headers: { 
        "Content-Type": "application/json",
        ...authHeaders
       },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (!res.ok) {
        return NextResponse.json({ success: false, message: data.message || "Failed to update user." }, { status: res.status });
    }

    return NextResponse.json(data, { status: res.status });
    
  } catch (err: any) {
    console.error("Update user proxy failed:", err);
    return NextResponse.json(
      { success: false, message: "Update user proxy failed", details: err.message },
      { status: 500 }
    );
  }
}


export async function DELETE(req: NextRequest) {
  try {
    const authHeaders = getAuthHeadersFromCookie();

    if (Object.keys(authHeaders).length === 0 || !authHeaders['x-user-id']) {
      return NextResponse.json({ success: false, message: "Unauthorized: Missing user data" }, { status: 401 });
    }
    
    const body = await req.json();
    
    if (!body || !body.userId) {
        return NextResponse.json({ success: false, message: "Invalid request: userId is required." }, { status: 400 });
    }

    const res = await fetch(`${API_BASE_URL}/api/v1/org-users`, {
      method: "DELETE",
      headers: { 
        "Content-Type": "application/json",
        ...authHeaders
       },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (!res.ok) {
        return NextResponse.json({ success: false, message: data.message || "Failed to deactivate user." }, { status: res.status });
    }

    return NextResponse.json(data, { status: res.status });
    
  } catch (err: any) {
    console.error("Delete user proxy failed:", err);
    return NextResponse.json(
      { success: false, message: "Delete user proxy failed", details: err.message },
      { status: 500 }
    );
  }
}

    