
import { NextResponse } from 'next/server';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://astramaan-be-1.onrender.com";

function getAuthHeaders(req: Request): Record<string, string> {
    const userHeader = req.headers.get('x-user');
    if (!userHeader) {
        console.warn("x-user header is missing in request to /api/leads");
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
        
        const payload = {
            inviteeDetails: {
                inviteeName: body.fullName,
                inviteeEmail: body.email,
                inviteeMobileNumber: body.phoneNumber,
                inviteeRole: 'LEAD',
                siteLocationPinCode: body.siteLocationPinCode
            }
        };

        console.log("Sending payload to backend:", JSON.stringify(payload, null, 2));

        const res = await fetch(`${API_BASE_URL}/api/v1/leads`, {
            method: 'POST',
            headers: getAuthHeaders(req),
            body: JSON.stringify(payload),
        });
        
        const text = await res.text();
        console.log("Received response from backend:", {
            status: res.status,
            statusText: res.statusText,
            body: text,
        });

        // Handle cases where the backend might return an empty body on success
        if (!text) {
            if (res.ok) {
                 return new NextResponse(JSON.stringify({ success: true, message: "Lead added successfully." }), { status: res.status, headers: { 'Content-Type': 'application/json' } });
            }
            // If response is not ok and body is empty, create a generic error response.
            return NextResponse.json({ success: false, message: "An error occurred on the backend and it sent no details." }, { status: res.status });
        }
        
        const data = JSON.parse(text);
        return NextResponse.json(data, { status: res.status });

    } catch (error) {
        console.error("Add lead proxy failed:", error);
        return NextResponse.json({ success: false, message: "An unexpected error occurred while adding the lead." }, { status: 500 });
    }
}
