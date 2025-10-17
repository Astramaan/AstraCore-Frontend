"use server";

import { revalidatePath } from "next/cache";

// This file is intentionally sparse.
// All data fetching and mutations are handled by API proxy routes in /src/app/api.
// We are only using this file for Next.js-specific server functions like revalidatePath if needed.

export async function addMember(
  _prevState: unknown,
  _formData: FormData,
): Promise<{ success: boolean; message: string }> {
  // This is a placeholder. The actual logic is in the AddMemberSheet component for now.
  // In a real app, you would handle form submission to your backend here.
  return { success: true, message: "Member added (placeholder action)." };
}

export async function createPassword(
  _prevState: unknown,
  _formData: FormData,
): Promise<{ success: boolean; message: string }> {
  return { success: true, message: "Password created (placeholder action)." };
}

export async function requestPasswordReset(
  _prevState: unknown,
  formData: FormData,
): Promise<{ success: boolean; message: string }> {
  const email = formData.get("email");
  // In a real app, you'd send a reset link to this email
  return {
    success: true,
    message: `Password reset link sent to ${email} (placeholder).`,
  };
}

export async function deactivateUser(
  _prevState: unknown,
  formData: FormData,
): Promise<{ success: boolean; message: string }> {
  const userId = formData.get("userId");
  return { success: true, message: `User ${userId} deactivated.` };
}

export async function createMeeting(formData: Record<string, unknown>) {
  try {
    const res = await fetch(`/api/meetings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (!res.ok) {
      const error = await res.json();
      return { success: false, message: error.message };
    }
    revalidatePath("/meetings");
    return { success: true, data: await res.json() };
  } catch (e: unknown) {
    return { success: false, message: "An unexpected error occurred." };
  }
}

export async function updateMeeting(formData: Record<string, unknown>) {
  try {
    const { projectId, meetingId } = formData;
    const res = await fetch(
      `/api/projects/${projectId}/meetings/${meetingId}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      },
    );
    if (!res.ok) {
      const error = await res.json();
      return { success: false, message: error.message };
    }
    revalidatePath(`/meetings`);
    return { success: true, data: await res.json() };
  } catch (e: unknown) {
    return { success: false, message: "An unexpected error occurred." };
  }
}
