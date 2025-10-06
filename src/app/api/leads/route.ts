
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
        const res = await fetch(`${API_BASE_URL}/api/v1/org/leads`, {
            headers: getAuthHeaders(req),
        });
        const data = await res.json();
        return NextResponse.json(data, { status: res.status });
    } catch (error) {
        console.error("Get leads proxy failed:", error);
        return NextResponse.json({ success: false, message: "An unexpected error occurred." }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        
        // Backend expects the payload to be nested inside `inviteeDetails`
        const payload = {
            inviteeDetails: {
                inviteeName: body.fullName,
                inviteeEmail: body.email,
                inviteeMobileNumber: body.phoneNumber,
                inviteeRole: 'LEAD',
                siteLocationPinCode: body.siteLocationPinCode
            }
        };

        const res = await fetch(`${API_BASE_URL}/api/v1/invites`, {
            method: 'POST',
            headers: getAuthHeaders(req),
            body: JSON.stringify(payload),
        });
        
        const text = await res.text();
        if (!text) {
            if (res.ok) {
                 return new NextResponse(JSON.stringify({ success: true, message: "Invitation sent successfully." }), { status: res.status, headers: { 'Content-Type': 'application/json' } });
            }
            // If response is not ok and body is empty, create a generic error response.
            return NextResponse.json({ success: false, message: "An error occurred on the backend." }, { status: res.status });
        }
        
        const data = JSON.parse(text);
        return NextResponse.json(data, { status: res.status });

    } catch (error) {
        console.error("Add lead proxy (invite) failed:", error);
        return NextResponse.json({ success: false, message: "An unexpected error occurred." }, { status: 500 });
    }
}
