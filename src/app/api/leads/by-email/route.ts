
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

        const { searchParams } = new URL(req.url);
        const email = searchParams.get('email');

        if (!email) {
            return NextResponse.json({ success: false, message: 'Email query parameter is required.' }, { status: 400 });
        }

        const res = await fetch(`${API_BASE_URL}/api/v1/org/lead-by-email?email=${encodeURIComponent(email)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
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
            return NextResponse.json({ success: false, message: errorBody.message || 'Failed to fetch lead from backend.' }, { status: res.status });
        }

        const data = await res.json();
        return NextResponse.json(data, { status: 200 });

    } catch (err: any) {
        console.error("Get lead by email proxy failed:", err);
        return NextResponse.json(
            { success: false, message: "Get lead by email proxy failed", details: err.message },
            { status: 500 }
        );
    }
}
