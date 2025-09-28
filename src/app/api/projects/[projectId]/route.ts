

import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";
import { cookies } from 'next/headers';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://astramaan-be-1.onrender.com";

function getAuthHeadersFromCookie(): Record<string, string> {
    const staticUserData = {
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
        'x-user': JSON.stringify(staticUserData),
        'x-user-id': staticUserData.userId,
        'x-login-id': staticUserData.email,
    };
}


export async function GET(req: NextRequest, { params }: { params: { projectId: string } }) {
  const projectId = params.projectId;
  try {
    const authHeaders = getAuthHeadersFromCookie();

    if (Object.keys(authHeaders).length === 0 || !authHeaders['x-user-id']) {
      return NextResponse.json({ success: false, message: "Unauthorized: Missing user data" }, { status: 401 });
    }

    if (!projectId) {
      return NextResponse.json({ success: false, message: "Project ID is required." }, { status: 400 });
    }

    const res = await fetch(`${API_BASE_URL}/api/v1/org/projects/${projectId}`, {
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
        return NextResponse.json({ success: false, message: errorBody.message || 'Failed to fetch project details from backend.' }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data, { status: 200 });

  } catch (err: any) {
    console.error(`Get project details proxy failed for ${projectId}:`, err);
    return NextResponse.json(
      { success: false, message: "Get project details proxy failed", details: err.message },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { projectId: string } }) {
    const projectId = params.projectId;
    try {
        const authHeaders = getAuthHeadersFromCookie();

        if (Object.keys(authHeaders).length === 0 || !authHeaders['x-user-id']) {
            return NextResponse.json({ success: false, message: "Unauthorized: Missing user data" }, { status: 401 });
        }

        if (!projectId) {
            return NextResponse.json({ success: false, message: "Project ID is required." }, { status: 400 });
        }

        const body = await req.json();

        const res = await fetch(`${API_BASE_URL}/api/v1/org/projects/${projectId}`, {
            method: "PATCH",
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
            console.error("Backend error on project update:", errorBody);
            return NextResponse.json({ success: false, message: errorBody.message || 'Failed to update project.' }, { status: res.status });
        }

        const data = await res.json();
        return NextResponse.json(data, { status: 200 });

    } catch (err: any) {
        console.error(`Update project proxy failed for ${projectId}:`, err);
        return NextResponse.json(
            { success: false, message: "Update project proxy failed", details: err.message },
            { status: 500 }
        );
    }
}

export async function DELETE(req: NextRequest, { params }: { params: { projectId: string } }) {
    const projectId = params.projectId;
    try {
        const authHeaders = getAuthHeadersFromCookie();

        if (Object.keys(authHeaders).length === 0 || !authHeaders['x-user-id']) {
            return NextResponse.json({ success: false, message: "Unauthorized: Missing user data" }, { status: 401 });
        }

        if (!projectId) {
            return NextResponse.json({ success: false, message: "Project ID is required." }, { status: 400 });
        }

        const res = await fetch(`${API_BASE_URL}/api/v1/org/projects/${projectId}`, {
            method: "DELETE",
            headers: {
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
            console.error("Backend error on project deletion:", errorBody);
            return NextResponse.json({ success: false, message: errorBody.message || 'Failed to delete project.' }, { status: res.status });
        }

        const data = await res.json();
        return NextResponse.json(data, { status: 200 });

    } catch (err: any) {
        console.error(`Delete project proxy failed for ${projectId}:`, err);
        return NextResponse.json(
            { success: false, message: "Delete project proxy failed", details: err.message },
            { status: 500 }
        );
    }
}
