"use server";

// This file is intentionally sparse.
// All data fetching and mutations are handled by API proxy routes in /src/app/api.
// We are only using this file for Next.js-specific server functions like revalidatePath if needed.

export async function addMember(prevState: any, formData: FormData) {
  // This is a placeholder. The actual logic is in the AddMemberSheet component for now.
  // In a real app, you would handle form submission to your backend here.
  return { success: true, message: "Member added (placeholder action)." };
}

export async function createPassword(prevState: any, formData: FormData) {
  return { success: true, message: "Password created (placeholder action)." };
}

export async function requestPasswordReset(prevState: any, formData: FormData) {
  const email = formData.get("email");
  console.log(`Requesting password reset for ${email}`);
  // In a real app, you'd send a reset link to this email
  return {
    success: true,
    message: `Password reset link sent to ${email} (placeholder).`,
  };
}

export async function deactivateUser(prevState: any, formData: FormData) {
  const userId = formData.get("userId");
  console.log(`Deactivating user ${userId}`);
  return { success: true, message: `User ${userId} deactivated.` };
}

export async function createMeeting(formData: any) {
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
    return { success: true, data: await res.json() };
  } catch (e) {
    return { success: false, message: "An unexpected error occurred." };
  }
}

export async function updateMeeting(formData: any) {
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
    return { success: true, data: await res.json() };
  } catch (e) {
    return { success: false, message: "An unexpected error occurred." };
  }
}

export async function getLeadByEmail(email: string) {
  try {
    const res = await fetch(
      `/api/leads/by-email?email=${encodeURIComponent(email)}`,
    );
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      return {
        success: false,
        message: errorData.message || "Failed to fetch lead.",
      };
    }
    const data = await res.json();
    return { success: data.success, data: data.data };
  } catch (error) {
    return { success: false, message: "An unexpected network error occurred." };
  }
}
