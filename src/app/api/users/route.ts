
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const API_BASE_URL = "https://astramaan-be-1.onrender.com";

export async function GET(req: Request) {
  try {
    const token = cookies().get("auth_token")?.value;

    if (!token) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const res = await fetch(`${API_BASE_URL}/api/v1/org-users`, {
      method: "GET",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
       },
    });

    const data = await res.json();

    return NextResponse.json(data, { status: res.status });
    
  } catch (err: any) {
    console.error("Get users proxy failed:", err);
    return NextResponse.json(
      { success: false, message: "Get users proxy failed", details: err.message },
      { status: 500 }
    );
  }
}
