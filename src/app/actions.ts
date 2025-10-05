
'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://astramaan-be-1.onrender.com";

function getAuthHeaders(): Record<string, string> {
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


export async function getProjects() {
    try {
        const res = await fetch(`${API_BASE_URL}/api/v1/org/projects`, {
            headers: getAuthHeaders()
        });
        if (!res.ok) {
            const errorData = await res.json().catch(() => ({ message: 'Failed to fetch projects and parse error' }));
            return { success: false, message: errorData.message || 'Failed to fetch projects' };
        }
        const data = await res.json();
        return { success: true, data: data.data };
    } catch (error) {
        console.error('Get projects action failed:', error);
        return { success: false, message: 'An unexpected error occurred while fetching projects.' };
    }
}


export async function verifyInvite(token: string, orgId: string) {
    try {
        const res = await fetch(`${API_BASE_URL}/api/v1/invite/${token}/${orgId}`);
        const data = await res.json();

        if (!res.ok || !data.success) {
            return { success: false, message: data.message || "Invalid or expired invite link." };
        }

        const inviteDetails = data.data;
        const params = new URLSearchParams({
            email: inviteDetails.email,
            organization: inviteDetails.organizationName,
        });
        
        redirect(`/signup?${params.toString()}`);
    } catch (error) {
        console.error("Invite verification failed:", error);
        return { success: false, message: "An unexpected error occurred." };
    }
}


export async function signup(prevState: any, formData: FormData) {
  const email = formData.get('email');
  
  if (!email) {
      return { success: false, message: "Email is required." };
  }

  try {
    const res = await fetch(`${API_BASE_URL}/api/v1/send-otp-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
    });

    const data = await res.json();

    if (!res.ok || !data.success) {
        return { success: false, message: data.message || "Failed to send OTP. Please try again." };
    }
    
    const params = new URLSearchParams(Object.fromEntries(formData.entries()) as Record<string, string>);
    params.set('flow', 'signup');

    redirect(`/otp-verification?${params.toString()}`);
    
  } catch (error) {
      console.error("Signup action failed:", error);
      return { success: false, message: "An unexpected error occurred." };
  }
}

export async function addMember(prevState: any, formData: FormData) {
    try {
        const requestBody = {
            name: formData.get('name'),
            email: formData.get('email'),
            mobileNumber: formData.get('mobileNumber'),
            team: formData.get('team') || "New User",
            roleType: formData.get('roleType') || "client"
        };
        
        if (!requestBody.name || !requestBody.email || !requestBody.mobileNumber) {
            return { success: false, message: "Name, email, and mobile number are required." };
        }

        const res = await fetch(`${API_BASE_URL}/api/v1/invite`, {
            method: "POST",
            headers: getAuthHeaders(),
            body: JSON.stringify(requestBody),
        });

        const data = await res.json();

        if (!res.ok || !data.success) {
            return { success: false, message: data.message || "Failed to add member" };
        }

        return { success: true, message: data.message || "Member added successfully!" };
    } catch (error) {
        console.error("Add member action failed:", error);
        return { success: false, message: "An unexpected error occurred." };
    }
}

export async function addLead(prevState: any, formData: FormData) {
    try {
        const payload = {
            fullName: formData.get('fullName') as string,
            phoneNumber: formData.get('phoneNumber') as string,
            email: formData.get('email') as string,
            siteLocationPinCode: formData.get('pincode') as string,
        };

        if (!payload.fullName || !payload.phoneNumber || !payload.email || !payload.siteLocationPinCode) {
            return { success: false, message: "All fields are required." };
        }
        
        const res = await fetch(`${API_BASE_URL}/api/v1/org/invites`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(payload),
        });

        if (!res.ok) {
            const data = await res.json().catch(() => ({}));
            return { success: false, message: data.message || 'Failed to create lead.' };
        }

        const text = await res.text();
        if (!text) {
             return { success: true, message: "Lead added successfully!" };
        }
        
        const data = JSON.parse(text);

        if (data.success === false) {
             return { success: false, message: data.message || 'An error occurred on the backend.' };
        }

        return { success: true, message: data.message || "Lead added successfully!" };
    } catch (error) {
        console.error('Add lead action failed:', error);
        return { success: false, message: 'An unexpected error occurred.' };
    }
}

export async function getLeadByEmail(email: string) {
    try {
        if (!email) {
            return { success: false, message: 'Email is required.', data: null };
        }

        const res = await fetch(`${API_BASE_URL}/api/v1/org/lead-by-email?email=${encodeURIComponent(email)}`, {
            method: 'GET',
            headers: getAuthHeaders(),
        });

        const data = await res.json();
        
        if (!res.ok || !data.success) {
            return { success: false, message: data.message || 'Failed to fetch lead.', data: null };
        }

        return { success: true, data: data.data, message: data.message || "Lead fetched successfully" };
    } catch (error) {
        console.error('Get lead by email action failed:', error);
        return { success: false, message: 'An unexpected error occurred.', data: null };
    }
}

export async function addProject(projectData: any) {
    try {
        const res = await fetch(`${API_BASE_URL}/api/v1/org/projects`, {
            method: "POST",
            headers: getAuthHeaders(),
            body: JSON.stringify(projectData),
        });

        if (!res.ok) {
            const errorData = await res.json().catch(() => ({ message: "Failed to create project and parse error" }));
            return { success: false, message: errorData.message || "Failed to create project." };
        }

        const text = await res.text();
        if (!text) {
            return { success: true, data: {}, message: "Project created successfully." };
        }
        
        const data = JSON.parse(text);

        if (data.success === false) {
             return { success: false, message: data.message || 'An error occurred on the backend.' };
        }
        
        return { success: true, data: data.data, message: data.message || "Project created successfully." };
    } catch (error) {
        console.error('Add project action failed:', error);
        return { success: false, message: 'An unexpected error occurred.' };
    }
}

export async function updateProject(projectData: any) {
    try {
        if (!projectData.id) {
            return { success: false, message: 'Project ID is required to update.' };
        }
        const res = await fetch(`${API_BASE_URL}/api/v1/org/projects/${projectData.id}`, {
            method: "PATCH",
            headers: getAuthHeaders(),
            body: JSON.stringify(projectData),
        });

        const data = await res.json();
        if (!res.ok || !data.success) {
            return { success: false, message: data.message || 'Failed to update project' };
        }
        return { success: true, message: 'Project updated successfully' };
    } catch (error) {
        console.error('Update project action failed:', error);
        return { success: false, message: 'An unexpected error occurred.' };
    }
}

export async function deleteProject(id: string) {
    try {
        if (!id) {
            return { success: false, message: 'Project ID is required to delete.' };
        }
        const res = await fetch(`${API_BASE_URL}/api/v1/org/projects/${id}`, {
            method: "DELETE",
            headers: getAuthHeaders(),
        });

        const data = await res.json();
        if (!res.ok || !data.success) {
            return { success: false, message: data.message || 'Failed to delete project' };
        }
        return { success: true, message: 'Project deleted successfully' };
    } catch (error) {
        console.error('Delete project action failed:', error);
        return { success: false, message: 'An unexpected error occurred.' };
    }
}

export async function inviteUser(prevState: any, formData: FormData) {
    const email = formData.get('email');
    const role = formData.get('role');

    if (!email || !role) {
        return { success: false, message: "Email and role are required." };
    }

    try {
        const res = await fetch(`${API_BASE_URL}/api/v1/signuplink`, {
            method: "POST",
            headers: getAuthHeaders(),
            body: JSON.stringify({ email, role }),
        });

        const data = await res.json();

        if (!res.ok || !data.success) {
            return { success: false, message: data.message || "Invitation failed" };
        }
        
        return { success: true, message: "Invitation sent successfully!" };

    } catch (error) {
        console.error("Invite user action failed:", error);
        return { success: false, message: "An unexpected error occurred." };
    }
}

export async function requestPasswordReset(prevState: any, formData: FormData) {
    const email = formData.get("email");

    if (!email) {
        return { success: false, message: "Email is required." };
    }

    try {
        const res = await fetch(`${API_BASE_URL}/api/v1/send-otp-email`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        });

        const data = await res.json();

        if (!res.ok || !data.success) {
            return { success: false, message: data.message || "Failed to send OTP. Please try again." };
        }

        redirect(`/otp-verification?email=${email}&flow=forgot-password`);
        
    } catch (error) {
        console.error("Request password reset failed:", error);
        return { success: false, message: "An unexpected error occurred." };
    }
}

export async function verifyOtp(prevState: any, formData: FormData) {
    const otp = (formData.getAll('otp') as string[]).join('');
    const email = formData.get('email') as string;
    const flow = formData.get('flow');
    
    if (!otp || otp.length < 4) {
        return { success: false, message: "Please enter a valid OTP." };
    }

    try {
        const res = await fetch(`${API_BASE_URL}/api/v1/email-verification`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, otp }),
        });

        const data = await res.json();

        if (!res.ok || !data.success) {
            return { success: false, message: data.message || "Invalid OTP. Please try again." };
        }

        const params = new URLSearchParams(Object.fromEntries(formData.entries()) as Record<string, string>);
        
        if (flow === 'signup') {
            redirect(`/create-password?${params.toString()}`);
        } else if (flow === 'forgot-password' || flow === 'change-password') {
            redirect(`/set-password?${params.toString()}`);
        }
        
        return { success: true };

    } catch (error) {
        console.error("Verify OTP action failed:", error);
        return { success: false, message: "An unexpected error occurred." };
    }
}

export async function createPassword(prevState: any, formData: FormData) {
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirm-password') as string;

    if (password !== confirmPassword) {
        return { success: false, message: 'Passwords do not match.' };
    }

    try {
        const res = await fetch(`${API_BASE_URL}/api/v1/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(Object.fromEntries(formData.entries())),
        });

        const data = await res.json();

        if (!res.ok || !data.success) {
            return { success: false, message: data.message || "Failed to create account." };
        }
        
        redirect('/password-success');

    } catch (error) {
        console.error("Create password action failed:", error);
        return { success: false, message: "An unexpected error occurred." };
    }
}

export async function changePassword(prevState: any, formData: FormData) {
    try {
        const payload = Object.fromEntries(formData.entries()) as Record<string, string>;
        
        if (payload.newPassword !== payload.confirmPassword) {
            return { success: false, message: 'New passwords do not match.' };
        }

        const res = await fetch(`${API_BASE_URL}/api/v1/update-password`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(payload),
        });

        const data = await res.json();

        if (!res.ok || !data.success) {
            return { success: false, message: data.message || 'Failed to change password' };
        }

        return { success: true, message: 'Password changed successfully' };
    } catch (error) {
        console.error('Change password action failed:', error);
        return { success: false, message: 'An unexpected error occurred.' };
    }
}

export async function updateUser(prevState: any, formData: FormData) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/v1/updateProfile`, {
      method: "PATCH",
      headers: getAuthHeaders(),
      body: JSON.stringify(Object.fromEntries(formData)),
    });
    
    const data = await res.json();
    
    if (!res.ok || !data.success) {
      return { success: false, message: data.message || "Failed to update user" };
    }

    const cookieStore = cookies();
    const userCookie = cookieStore.get('astramaan_user');
    if(userCookie) {
        const userData = JSON.parse(userCookie.value);
        const updatedUserData = { ...userData, ...Object.fromEntries(formData) };
        cookieStore.set('astramaan_user', JSON.stringify(updatedUserData), {
            path: '/',
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
        });
    }
    
    return { success: true, message: data.message || "Profile updated successfully" };
  } catch (error) {
    console.error("Update user action failed:", error);
    return { success: false, message: "An unexpected error occurred." };
  }
}

export async function deactivateUser(userId: string) {
    if (!userId) {
        return { success: false, message: "User ID is required." };
    }
    
    try {
        const res = await fetch(`${API_BASE_URL}/api/v1/org-users`, {
            method: "DELETE",
            headers: getAuthHeaders(),
            body: JSON.stringify({ userId }),
        });

        const data = await res.json();

        if (!res.ok || !data.success) {
            return { success: false, message: data.message || "Failed to deactivate user" };
        }

        return { success: true, message: data.message || "User deactivated successfully!" };
    } catch (error) {
        console.error("Deactivate user action failed:", error);
        return { success: false, message: "An unexpected error occurred." };
    }
}

export async function createMeeting(meetingData: any) {
    const { date, time, ...rest } = meetingData;
    const combinedDateTime = new Date(date);
    const [timeValue, period] = time.split(' ');
    let [hours, minutes] = timeValue.split(':').map(Number);
    if (period === 'PM' && hours < 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;
    combinedDateTime.setHours(hours, minutes, 0, 0);

    const payload = {
        ...rest,
        date: combinedDateTime.toISOString().split('T')[0],
        startTime: combinedDateTime.toISOString(),
        description: meetingData.description || "No description provided.",
    };

    try {
        const res = await fetch(`${API_BASE_URL}/api/v1/meetings`, {
            method: "POST",
            headers: getAuthHeaders(),
            body: JSON.stringify(payload),
        });

        const data = await res.json();
        
        if (!res.ok || !data.success) {
            return { success: false, message: data.message || "Failed to create meeting." };
        }

        return { success: true, data: data.data, message: "Meeting created successfully." };
    } catch (error) {
        console.error('Create meeting action failed:', error);
        return { success: false, message: 'An unexpected error occurred.' };
    }
}
    
  
export async function updateMeeting(meetingData: any) {
    const { projectId, meetingId, ...payload } = meetingData;
    try {
        if (!projectId || !meetingId) {
            return { success: false, message: 'Project ID and Meeting ID are required for an update.' };
        }
        const res = await fetch(`${API_BASE_URL}/api/v1/org/projects/${projectId}/meetings/${meetingId}`, {
            method: "PATCH",
            headers: getAuthHeaders(),
            body: JSON.stringify(payload),
        });

        if (!res.ok) {
            const errorData = await res.json().catch(() => ({ message: 'Failed to update meeting' }));
            return { success: false, message: errorData.message || 'Failed to update meeting' };
        }

        const data = await res.json();
        return { success: true, message: 'Meeting updated successfully', data: data.data };
    } catch (error) {
        console.error('Update meeting action failed:', error);
        return { success: false, message: 'An unexpected error occurred.' };
    }
}


export async function deleteMeeting(projectId: string, meetingId: string) {
    try {
        if (!projectId || !meetingId) {
            return { success: false, message: 'Project ID and Meeting ID are required for deletion.' };
        }
        const res = await fetch(`${API_BASE_URL}/api/v1/org/projects/${projectId}/meetings/${meetingId}`, {
            method: 'DELETE',
            headers: getAuthHeaders()
        });
        
        if (!res.ok) {
            const errorData = await res.json().catch(() => ({ message: 'Failed to delete meeting' }));
            return { success: false, message: errorData.message || 'Failed to delete meeting' };
        }
        const data = await res.json();
        return { success: true, message: 'Meeting deleted successfully', data: data.data };

    } catch (error) {
        console.error('Delete meeting action failed:', error);
        return { success: false, message: 'An unexpected error occurred.' };
    }
}

    