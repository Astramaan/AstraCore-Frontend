
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
        const headers: Record<string, string> = {};
        const userHeaders = ['userId', 'name', 'email', 'role', 'mobileNumber', 'city', 'organizationId', 'orgCode', 'team', 'roleType'];
        
        userHeaders.forEach(headerKey => {
            if (userData[headerKey]) {
                headers[headerKey] = String(userData[headerKey]);
            }
        });
        return headers;
    } catch (e) {
        console.error("Failed to parse user data cookie", e);
        return {};
    }
}

export async function GET(req: NextRequest) {
  try {
    const authHeaders = getAuthHeadersFromCookie();

    if (Object.keys(authHeaders).length === 0) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const res = await fetch(`${API_BASE_URL}/api/v1/org-users`, {
      method: "GET",
      headers: { 
        "Content-Type": "application/json",
        ...authHeaders,
        'x-user-id': authHeaders.userId
       },
    });

    const data = await res.json();

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

    if (Object.keys(authHeaders).length === 0) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }
    
    const body = await req.json();

    const res = await fetch(`${API_BASE_URL}/api/v1/invites`, {
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

    if (Object.keys(authHeaders).length === 0) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
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

    if (Object.keys(authHeaders).length === 0) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }
    
    const body = await req.json();

    const res = await fetch(`${API_BASE_URL}/api/v1/org-users`, {
      method: "DELETE",
      headers: { 
        "Content-Type": "application/json",
        ...authHeaders
       },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    return NextResponse.json(data, { status: res.status });
    
  } catch (err: any) {
    console.error("Delete user proxy failed:", err);
    return NextResponse.json(
      { success: false, message: "Delete user proxy failed", details: err.message },
      { status: 500 }
    );
  }
}

    