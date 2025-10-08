
import { NextResponse } from 'next/server';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://astramaan-be-1.onrender.com";

function getAuthHeaders(req: Request): Record<string, string> {
    const userHeader = req.headers.get('x-user');
    if (!userHeader) {
        // Fallback to static user if header is not present
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
            'Content-Type': 'application/json',
            'x-user': JSON.stringify(staticUser),
            'x-user-id': staticUser.userId,
            'x-login-id': staticUser.email,
            'x-organization-id': staticUser.organizationId,
        };
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
        // Return headers with a default/error state if parsing fails
        return { 'Content-Type': 'application/json' };
    }
}


export async function POST(req: Request) {
    try {
        const body = await req.json();
        const res = await fetch(`${API_BASE_URL}/api/v1/email-verification`, {
            method: 'POST',
            headers: getAuthHeaders(req),
            body: JSON.stringify(body),
        });

        const data = await res.json();
        return NextResponse.json(data, { status: res.status });
    } catch (error) {
        console.error("Verify OTP proxy failed:", error);
        return NextResponse.json({ success: false, message: "An unexpected error occurred." }, { status: 500 });
    }
}
