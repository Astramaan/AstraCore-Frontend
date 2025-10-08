
import { NextResponse } from 'next/server';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://astramaan-be-1.onrender.com";

function getAuthHeaders(req: Request): Record<string, string> {
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
    };
    
    const userHeader = req.headers.get('x-user');
    const authHeader = req.headers.get('authorization');

    if (authHeader) {
        headers['Authorization'] = authHeader;
    }

    if (!userHeader) {
        console.warn("x-user header is missing in request to /api/invite");
        return headers;
    }
    
    try {
        const user = JSON.parse(userHeader);
        headers['x-user'] = userHeader;
        headers['x-user-id'] = user.userId;
        headers['x-login-id'] = user.email;
        headers['x-organization-id'] = user.organizationId;
        return headers;
    } catch (error) {
        console.error("Failed to parse x-user header:", error);
        return headers;
    }
}


export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const token = searchParams.get('token');
        const orgId = searchParams.get('orgId');

        const res = await fetch(`${API_BASE_URL}/api/v1/invite/${token}/${orgId}`);
        const data = await res.json();
        return NextResponse.json(data, { status: res.status });
    } catch (error) {
        console.error("Verify invite proxy failed:", error);
        return NextResponse.json({ success: false, message: "An unexpected error occurred." }, { status: 500 });
    }
}

export async function POST(req: Request) {
     try {
        const body = await req.json();
        const res = await fetch(`${API_BASE_URL}/api/v1/invite`, {
            method: 'POST',
            headers: getAuthHeaders(req),
            body: JSON.stringify(body),
        });

        const text = await res.text();
        const data = text ? JSON.parse(text) : {};
        
        return NextResponse.json(data, { status: res.status });
    } catch (error) {
        console.error("Invite user proxy failed:", error);
        return NextResponse.json({ success: false, message: "An unexpected error occurred." }, { status: 500 });
    }
}
