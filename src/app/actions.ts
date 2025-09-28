
'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://astramaan-be-1.onrender.com";

function getAuthHeadersFromCookie(): Record<string, string> {
    const cookieStore = cookies();
    const userDataCookie = cookieStore.get('user-data');
    if (!userDataCookie) {
        return {};
    }

    try {
        let userData;
        const cookieValue = userDataCookie.value;
        
        try {
            // First attempt to parse
            userData = JSON.parse(cookieValue);
            
            // Check if it's a string and needs another parse
            if (typeof userData === 'string') {
                try {
                    userData = JSON.parse(userData);
                } catch (innerError) {
                    console.error("Failed to parse double-stringified cookie", innerError);
                    return {};
                }
            }
            
            // Validate the expected structure
            if (!userData || typeof userData !== 'object' || !userData.userId || !userData.email) {
                console.error("Invalid user data structure in cookie");
                return {};
            }
            
            return {
                'x-user': JSON.stringify(userData),
                'x-user-id': userData.userId,
                'x-login-id': userData.email,
            };
        } catch (e) {
            console.error("Failed to parse user data cookie", e);
            return {};
        }
    } catch (e) {
        console.error("Error accessing cookie", e);
        return {};
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
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/send-otp`, {
        method: "POST",
        headers: { 
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email }),
    });

    const data = await res.json();

    if (!res.ok || !data.success) {
        return { success: false, message: data.error || data.message || "Failed to send OTP. Please try again." };
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
        const rawFormData = Object.fromEntries(formData.entries()) as Record<string, string>;
        const requestBody = {
            name: rawFormData.name,
            email: rawFormData.email,
            mobileNumber: rawFormData.mobileNumber,
            team: rawFormData.team || "New User",
            roleType: rawFormData.roleType || "client"
        };
        
        if (!requestBody.name || !requestBody.email || !requestBody.mobileNumber) {
            return { success: false, message: "Name, email, and mobile number are required." };
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/users`, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
            },
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
            siteAddressPinCode: formData.get('pincode') as string,
        };

        if (!payload.fullName || !payload.phoneNumber || !payload.email || !payload.siteAddressPinCode) {
            return { success: false, message: "All fields are required." };
        }
        
        const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/leads`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        const data = await res.json();
        
        if (!res.ok || !data.success) {
            return { success: false, message: data.message || 'Failed to create lead.' };
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
            headers: {
                'Content-Type': 'application/json',
                ...getAuthHeadersFromCookie()
            },
        });

        const data = await res.json();
        
        if (!res.ok || !data.success) {
            return { success: false, message: data.message || 'Failed to fetch lead.', data: null };
        }

        return { success: true, data: data.lead, message: data.message || "Lead fetched successfully" };
    } catch (error) {
        console.error('Get lead by email action failed:', error);
        return { success: false, message: 'An unexpected error occurred.', data: null };
    }
}

export async function addProject(projectData: any) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/projects`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(projectData),
        });

        const data = await res.json();
        
        if (!res.ok || !data.success) {
            return { success: false, message: data.message || "Failed to create project." };
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
        const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/projects`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
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
        const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/projects`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id }),
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
        const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/invite`, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
            },
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
        const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/send-otp`, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json"
            },
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
        const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/verify-otp`, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json"
            },
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
        const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/signup`, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json"
            },
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

        const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/update-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
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
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/update-profile`, {
      method: "PATCH",
      headers: { 
          "Content-Type": "application/json",
        },
      body: JSON.stringify(Object.fromEntries(formData)),
    });
    
    const data = await res.json();
    
    if (!res.ok || !data.success) {
      return { success: false, message: data.message || "Failed to update user" };
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
        const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/users`, {
            method: "DELETE",
            headers: { 
                "Content-Type": "application/json",
            },
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
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/meetings`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(meetingData),
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
