
import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://astramaan-be-1.onrender.com";

function getAuthHeaders(): Record<string, string> {
    const staticUser = {
        "userId": "8c26c0b3032ecc4f",
        "name": "saras",
        "email": "saras@gmail.com",
        "role": "ORG_ADMIN",
        "mobileNumber": "9876543210",
        "city": "Delhi",
        "organizationId": "ORG-f9705032-d42a-46df-b799-87bcda629142",
        "orgCode": "ABCConstructionsDEL"
    };
    
    return {
        'x-user': JSON.stringify(staticUser),
        'x-user-id': staticUser.userId,
        'x-login-id': staticUser.email,
        'x-organization-id': staticUser.organizationId,
    };
}

export async function GET(req: NextRequest) {
  try {
    const authHeaders = getAuthHeaders();

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
    const authHeaders = getAuthHeaders();

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
    const authHeaders = getAuthHeaders();

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
    const authHeaders = getAuthHeaders();

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
