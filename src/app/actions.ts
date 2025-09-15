
'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const API_BASE_URL = "https://astramaan-be-1.onrender.com";

export async function login(prevState: any, formData: FormData) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/v1/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(formData)),
    });

    const data = await res.json();

    if (data.success && data.user) {
        cookies().set('user-data', JSON.stringify(data.user), {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'strict',
            path: '/',
            maxAge: 60 * 60 * 24 * 7 // 1 week
        });
        
        // Redirect on the server-side after setting the cookie.
        // This is the reliable way to handle post-login navigation.
        redirect('/organization/home');
    }

    return data;
  } catch (error) {
      console.error("Login action failed:", error);
      if (error instanceof Error && error.message.includes('NEXT_REDIRECT')) {
        throw error;
      }
      return { success: false, message: "An unexpected error occurred." };
  }
}


export async function signup(prevState: any, formData: FormData) {
  const email = formData.get('email');
  
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
    });

    const data = await res.json();

    if (!res.ok || !data.success) {
        return { error: data.message || "Failed to send OTP. Please try again." };
    }
    
    const params = new URLSearchParams(Object.fromEntries(formData.entries()) as Record<string, string>);
    params.set('flow', 'signup');

    redirect(`/otp-verification?${params.toString()}`);
    
  } catch (error) {
      console.error("Signup action failed:", error);
      return { error: "An unexpected error occurred." };
  }
}

export async function addMember(prevState: any, formData: FormData) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/users`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(Object.fromEntries(formData.entries())),
        });

        const data = await res.json();

        if (!res.ok) {
            return { success: false, message: data.message || "Failed to add member" };
        }

        return { success: true, message: data.message || "Member added successfully!" };
    } catch (error) {
        console.error("Add member action failed:", error);
        return { success: false, message: "An unexpected error occurred." };
    }
}

export async function addLead(prevState: any, formData: FormData) {
    console.log("Adding lead with data:", Object.fromEntries(formData.entries()));
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { success: true, message: 'Lead added successfully' };
}

export async function addProject(prevState: any, formData: FormData) {
    console.log("Adding project with data:", Object.fromEntries(formData.entries()));
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { success: true, message: 'Project added successfully' };
}

export async function updateProject(prevState: any, formData: FormData) {
    console.log("Updating project with data:", Object.fromEntries(formData.entries()));
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { success: true, message: 'Project updated successfully' };
}

export async function deleteProject(id: string) {
    console.log("Deleting project with ID:", id);
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { success: true, message: 'Project deleted successfully' };
}

export async function inviteUser(prevState: any, formData: FormData) {
    const email = formData.get('email');
    const role = formData.get('role');

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/invite`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, role }),
        });

        const data = await res.json();

        if (!res.ok) {
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
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/send-otp`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        });

        const data = await res.json();

        if (!res.ok || !data.success) {
            return { error: data.message || "Failed to send OTP. Please try again." };
        }

        const { redirect } = await import('next/navigation');
        redirect(`/otp-verification?email=${email}&flow=forgot-password`);
        
    } catch (error) {
        console.error("Request password reset failed:", error);
        return { error: "An unexpected error occurred." };
    }
}

export async function verifyOtp(prevState: any, formData: FormData) {
    const otp = (formData.getAll('otp') as string[]).join('');
    const email = formData.get('email') as string;
    const flow = formData.get('flow');
    
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/verify-otp`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, otp }),
        });

        const data = await res.json();

        if (!res.ok || !data.success) {
            return { error: data.message || "Invalid OTP. Please try again." };
        }

        const { redirect } = await import('next/navigation');
        if (flow === 'signup') {
            redirect(`/create-password?${new URLSearchParams(Object.fromEntries(formData.entries()) as Record<string, string>)}`);
        } else if (flow === 'forgot-password' || flow === 'change-password') {
            redirect(`/set-password?${new URLSearchParams(Object.fromEntries(formData.entries()) as Record<string, string>)}`);
        }
        
        return { success: true };

    } catch (error) {
        console.error("Verify OTP action failed:", error);
        return { error: "An unexpected error occurred." };
    }
}

export async function createPassword(prevState: any, formData: FormData) {
    const password = formData.get('password');
    const confirmPassword = formData.get('confirm-password');

    if (password !== confirmPassword) {
        return { error: 'Passwords do not match.' };
    }

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/create-password`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: formData.get('email'),
                password: password
            }),
        });

        const data = await res.json();

        if (!res.ok || !data.success) {
            return { error: data.message || "Failed to create password." };
        }
        
        const { redirect } = await import('next/navigation');
        redirect('/password-success');

    } catch (error) {
        console.error("Create password action failed:", error);
        return { error: "An unexpected error occurred." };
    }
}

export async function changePassword(prevState: any, formData: FormData) {
  console.log("Changing password for:", formData.get('email'));
  await new Promise(resolve => setTimeout(resolve, 1000));
  return { success: true, message: 'Password changed successfully' };
}

export async function updateUser(prevState: any, formData: FormData) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/users`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(formData)),
    });
    const data = await res.json();
    if (!res.ok) {
      return { success: false, message: data.message || "Failed to update user" };
    }
    return { success: true, message: data.message || "Profile updated successfully" };
  } catch (error) {
    console.error("Update user action failed:", error);
    return { success: false, message: "An unexpected error occurred." };
  }
}

export async function deactivateUser(userId: string) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/users`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId }),
        });

        const data = await res.json();

        if (!res.ok) {
            return { success: false, message: data.message || "Failed to deactivate user" };
        }

        return { success: true, message: data.message || "User deactivated successfully!" };
    } catch (error) {
        console.error("Deactivate user action failed:", error);
        return { success: false, message: "An unexpected error occurred." };
    }
}
