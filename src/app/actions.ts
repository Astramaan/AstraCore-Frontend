
'use server';

import { revalidatePath } from "next/cache";

export async function addProject(payload: any) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/projects`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'x-user': JSON.stringify(payload.user)
            },
            body: JSON.stringify(payload.data),
        });

        if (!res.ok) {
            const errorData = await res.json().catch(() => ({ message: 'Failed to add project and parse error' }));
            return { success: false, message: errorData.message || 'Failed to add project' };
        }
        
        const text = await res.text();
        const data = text ? JSON.parse(text) : {};

        if (res.status === 201 || res.status === 200) { // Typically 201 for created
             revalidatePath('/organization/[organizationId]/projects', 'page');
             return { success: true, data: data.data };
        } else {
             return { success: false, message: data.message || 'An error occurred on the backend.' };
        }
    } catch (error) {
        console.error('Add project action failed:', error);
        return { success: false, message: 'An unexpected error occurred.' };
    }
}

export async function updateProject(payload: any) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/projects/${payload.id}`, {
            method: 'PATCH',
            headers: { 
                'Content-Type': 'application/json',
                'x-user': JSON.stringify(payload.user) // Pass user data in header
            },
            body: JSON.stringify(payload.data), // Only send the project data in the body
        });
        if (!res.ok) {
            const errorData = await res.json().catch(() => ({ message: 'Failed to update project and parse error' }));
            return { success: false, message: errorData.message || 'Failed to update project' };
        }
        const data = await res.json();
        revalidatePath('/organization/[organizationId]/projects', 'page');
        revalidatePath(`/organization/[organizationId]/projects/${payload.id}`, 'page');
        return { success: true, data };
    } catch (error) {
        console.error('Update project action failed:', error);
        return { success: false, message: 'An unexpected error occurred.' };
    }
}

export async function deleteProject({ projectId, user }: { projectId: string; user: any; }) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/projects/${projectId}`, {
            method: 'DELETE',
            headers: {
                'x-user': JSON.stringify(user)
            }
        });
        if (!res.ok) {
            const errorData = await res.json().catch(() => ({ message: 'Failed to delete project and parse error' }));
            return { success: false, message: errorData.message || 'Failed to delete project' };
        }
        const data = await res.json();
        revalidatePath('/organization/[organizationId]/projects', 'page');
        return { success: true, message: data.message || "Project deleted successfully" };
    } catch (error) {
        console.error('Delete project action failed:', error);
        return { success: false, message: 'An unexpected error occurred.' };
    }
}

export async function getLeadByEmail(email: string): Promise<{ success: boolean; data?: any; message?: string }> {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/leads/by-email?email=${encodeURIComponent(email)}`);
        if (!res.ok) {
            const errorData = await res.json().catch(() => ({ message: 'Failed to fetch lead and parse error' }));
            return { success: false, message: errorData.message || 'Failed to fetch lead' };
        }
        return await res.json();
    } catch (error) {
        console.error('Get lead by email action failed:', error);
        return { success: false, message: 'An unexpected error occurred.' };
    }
}

export async function addMember(prevState: any, formData: FormData) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/users`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(Object.fromEntries(formData)),
        });
        if (!res.ok) {
            const errorData = await res.json().catch(() => ({ message: 'Failed to add member and parse error' }));
            return { success: false, message: errorData.message || 'Failed to add member' };
        }
        const data = await res.json();
        revalidatePath('/organization/[organizationId]/teams', 'page');
        return { success: true, data };
    } catch (error) {
        console.error('Add member action failed:', error);
        return { success: false, message: 'An unexpected error occurred.' };
    }
}

export async function deactivateUser(prevState: any, formData: FormData) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/users`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(Object.fromEntries(formData)),
        });
        if (!res.ok) {
            const errorData = await res.json().catch(() => ({ message: 'Failed to deactivate user and parse error' }));
            return { success: false, message: errorData.message || 'Failed to deactivate user' };
        }
        const data = await res.json();
        revalidatePath('/organization/[organizationId]/teams', 'page');
        return { success: true, message: data.message || "User deactivated" };
    } catch (error) {
        console.error('Deactivate user action failed:', error);
        return { success: false, message: 'An unexpected error occurred.' };
    }
}

export async function requestPasswordReset(prevState: any, formData: FormData) {
    try {
        const email = formData.get('email');
        const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/send-otp`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
        });
         if (!res.ok) {
            const errorData = await res.json().catch(() => ({ message: 'Failed to send OTP and parse error' }));
            return { success: false, message: errorData.message || 'Failed to send OTP' };
        }
        return { success: true };
    } catch (error) {
        console.error('Request password reset action failed:', error);
        return { success: false, message: 'An unexpected error occurred.' };
    }
}


export async function createPassword(prevState: any, formData: FormData) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/create-password`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(Object.fromEntries(formData)),
        });
        if (!res.ok) {
            const errorData = await res.json().catch(() => ({ message: 'Failed to create password and parse error' }));
            return { success: false, message: errorData.message || 'Failed to create password' };
        }
        return { success: true };
    } catch (error) {
        console.error('Create password action failed:', error);
        return { success: false, message: 'An unexpected error occurred.' };
    }
}

export async function createMeeting(meetingData: any) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/meetings`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(meetingData),
        });
        if (!res.ok) {
            const errorData = await res.json().catch(() => ({ message: 'Failed to create meeting and parse error' }));
            return { success: false, message: errorData.message || 'Failed to create meeting' };
        }
        const data = await res.json();
        revalidatePath('/organization/[organizationId]/meetings', 'page');
        return { success: true, data };
    } catch (error) {
        console.error('Create meeting action failed:', error);
        return { success: false, message: 'An unexpected error occurred.' };
    }
}

export async function updateMeeting(meetingData: any) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/projects/${meetingData.projectId}/meetings/${meetingData.meetingId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(meetingData),
        });
        if (!res.ok) {
            const errorData = await res.json().catch(() => ({ message: 'Failed to update meeting and parse error' }));
            return { success: false, message: errorData.message || 'Failed to update meeting' };
        }
        const data = await res.json();
        revalidatePath('/organization/[organizationId]/meetings', 'page');
        return { success: true, data };
    } catch (error) {
        console.error('Update meeting action failed:', error);
        return { success: false, message: 'An unexpected error occurred.' };
    }
}
