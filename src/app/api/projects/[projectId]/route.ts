
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


export async function GET(req: Request, { params }: { params: { projectId: string } }) {
    try {
        const res = await fetch(`${API_BASE_URL}/api/v1/org/projects/${params.projectId}`, {
            headers: getAuthHeaders(req),
        });
        const data = await res.json();
        return NextResponse.json(data, { status: res.status });
    } catch (error) {
        console.error("Get project details proxy failed:", error);
        return NextResponse.json({ success: false, message: "An unexpected error occurred." }, { status: 500 });
    }
}

export async function PATCH(req: Request, { params }: { params: { projectId: string } }) {
    try {
        const body = await req.json();
        const res = await fetch(`${API_BASE_URL}/api/v1/org/projects/${params.projectId}`, {
            method: 'PATCH',
            headers: getAuthHeaders(req),
            body: JSON.stringify(body),
        });
        const data = await res.json();
        return NextResponse.json(data, { status: res.status });
    } catch (error) {
        console.error("Update project proxy failed:", error);
        return NextResponse.json({ success: false, message: "An unexpected error occurred." }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: { projectId: string } }) {
    try {
        const res = await fetch(`${API_BASE_URL}/api/v1/org/projects/${params.projectId}`, {
            method: 'DELETE',
            headers: getAuthHeaders(req),
        });
        const data = await res.json();
        return NextResponse.json(data, { status: res.status });
    } catch (error) {
        console.error("Delete project proxy failed:", error);
        return NextResponse.json({ success: false, message: "An unexpected error occurred." }, { status: 500 });
    }
}

