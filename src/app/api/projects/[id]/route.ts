
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
        let userData;
        const cookieValue = userDataCookie.value;
        
        try {
            // First attempt to parse
            userData = JSON.parse(cookieValue);
            
            // Check if it's a string and needs another parse
            if (typeof userData === 'string') {
                try {
                    userData = JSON.parse(userData);
                } catch (innerError) {
                    console.error("Failed to parse double-stringified cookie", innerError);
                    return {};
                }
            }
            
            // Validate the expected structure
            if (!userData || typeof userData !== 'object' || !userData.userId || !userData.email) {
                console.error("Invalid user data structure in cookie");
                return {};
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
    } catch (e) {
        console.error("Error accessing cookie", e);
        return {};
    }
}


export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const projectId = params.id;
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

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
    const projectId = params.id;
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
