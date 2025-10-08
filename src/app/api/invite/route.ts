
import { NextResponse } from 'next/server';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://astramaan-be-1.onrender.com";

function getAuthHeaders(req: Request): Record<string, string> {
    const userHeader = req.headers.get('x-user');
    if (!userHeader) {
        console.warn("x-user header is missing in request to /api/invite");
        return { 'Content-Type': 'application/json' };
    }
    
    try {
        const user = JSON.parse(userHeader);
        return {
            'Content-Type': 'application/json',
            'x-user': userHeader,
            'x-user-id': user.userId,
            'x-login-id': user.email,
            'x-organization-id': user.organizationId,
        };
    } catch (error) {
        console.error("Failed to parse x-user header:", error);
        return { 'Content-Type': 'application/json' };
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

        const data = await res.json();
        return NextResponse.json(data, { status: res.status });
    } catch (error) {
        console.error("Invite user proxy failed:", error);
        return NextResponse.json({ success: false, message: "An unexpected error occurred." }, { status: 500 });
    }
}
