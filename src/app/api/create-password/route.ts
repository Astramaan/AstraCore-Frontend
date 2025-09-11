
import { NextResponse } from "next/server";

const API_BASE_URL = "https://astramaan-be-1.onrender.com";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const res = await fetch(`${API_BASE_URL}/api/v1/create-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    return NextResponse.json(data, { status: res.status });
    
  } catch (err: any) {
    console.error("Create password proxy failed:", err);
    return NextResponse.json(
      { success: false, message: "Create password proxy failed", details: err.message },
      { status: 500 }
    );
  }
}
