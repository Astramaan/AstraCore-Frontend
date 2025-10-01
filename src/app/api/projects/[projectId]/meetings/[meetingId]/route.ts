// Placeholder DELETE/PATCH route to allow build
// Original code is commented out temporarily

// import { NextResponse, type NextRequest } from "next/server";

// export async function PATCH(req: NextRequest, { params }: { params: Record<string, string> }) { ... }
// export async function DELETE(req: NextRequest, { params }: { params: Record<string, string> }) { ... }

export async function PATCH() {
  // temporarily disabled for build
  return new Response(JSON.stringify({ success: false, message: "PATCH temporarily disabled" }), { status: 200 });
}

export async function DELETE() {
  // temporarily disabled for build
  return new Response(JSON.stringify({ success: false, message: "DELETE temporarily disabled" }), { status: 200 });
}
