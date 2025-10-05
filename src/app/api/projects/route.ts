
import { NextResponse } from 'next/server';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://astramaan-be-1.onrender.com";

function getAuthHeaders(req: Request): Record<string, string> {
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


export async function GET(req: Request) {
    try {
        const res = await fetch(`${API_BASE_URL}/api/v1/org/projects`, {
            headers: getAuthHeaders(req),
        });
        const data = await res.json();
        return NextResponse.json(data, { status: res.status });
    } catch (error) {
        console.error("Get projects proxy failed:", error);
        return NextResponse.json({ success: false, message: "An unexpected error occurred." }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const res = await fetch(`${API_BASE_URL}/api/v1/org/projects`, {
            method: 'POST',
            headers: getAuthHeaders(req),
            body: JSON.stringify(body),
        });
        
        const text = await res.text();
        if (!text) {
             return new NextResponse(null, { status: res.status });
        }
        
        const data = JSON.parse(text);
        return NextResponse.json(data, { status: res.status });

    } catch (error) {
        console.error("Add project proxy failed:", error);
        return NextResponse.json({ success: false, message: "An unexpected error occurred." }, { status: 500 });
    }
}
