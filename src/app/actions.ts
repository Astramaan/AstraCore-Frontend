
'use server';

import { cookies } from 'next/headers';

const API_BASE_URL = 'https://astramaan-be-1.onrender.com';

export async function authenticate(prevState: any, formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    const res = await fetch(`${API_BASE_URL}/api/v1/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      cache: "no-store",
    });

    const data = await res.json();

    if (!res.ok) {
      return { success: false, message: data.message || "Invalid credentials" };
    }

    // ✅ Save auth_token in cookies
    cookies().set('auth_token', data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    });

    return { success: true, user: data.user, token: data.token };

  } catch (err: any) {
    console.error("Auth error:", err.message);
    return { success: false, message: err.message || "Network error" };
  }
}

export async function signup(prevState: any, formData: FormData) {
  // This is a placeholder for the signup action.
  // In a real application, you would add your signup logic here.
  const email = formData.get('email');
  console.log('Signing up user with email:', email);
  await new Promise(resolve => setTimeout(resolve, 1000));
  return { success: true, message: 'Signup successful! Please check your email to verify.' };
}

export async function addMember(prevState: any, formData: FormData) {
    console.log("Adding member with data:", Object.fromEntries(formData.entries()));
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { success: true, message: 'Member added successfully' };
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
    console.log("Inviting user:", Object.fromEntries(formData.entries()));
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { success: true };
}


export async function requestPasswordReset(prevState: any, formData: FormData) {
    const email = formData.get("email");
    console.log(`Requesting password reset for ${email}`);
    // In a real app, you would call your backend here.
    // Simulating success for now.
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Redirect to OTP page
    const { redirect } = await import('next/navigation');
    redirect(`/otp-verification?email=${email}&flow=forgot-password`);
    
    return { success: true };
}

export async function verifyOtp(prevState: any, formData: FormData) {
    const otp = (formData.getAll('otp') as string[]).join('');
    const flow = formData.get('flow');
    console.log(`Verifying OTP ${otp} for flow: ${flow}`);
    
    // Simulating OTP verification
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (otp === "1234") {
        if (flow === 'signup') {
            const { redirect } = await import('next/navigation');
            redirect(`/create-password?${new URLSearchParams(Object.fromEntries(formData.entries()) as Record<string, string>)}`);
        }
        if (flow === 'forgot-password' || flow === 'change-password') {
            const { redirect } = await import('next/navigation');
            redirect(`/set-password?${new URLSearchParams(Object.fromEntries(formData.entries()) as Record<string, string>)}`);
        }
        return { success: true };
    } else {
        return { error: 'Invalid OTP. Please try again.' };
    }
}

export async function createPassword(prevState: any, formData: FormData) {
    console.log("Creating password for:", formData.get('email'));
    // In a real app, call backend to set/create password
    await new Promise(resolve => setTimeout(resolve, 1000));
    const { redirect } = await import('next/navigation');
    redirect('/password-success');
    return { success: true };
}

export async function changePassword(prevState: any, formData: FormData) {
  console.log("Changing password for:", formData.get('email'));
  await new Promise(resolve => setTimeout(resolve, 1000));
  return { success: true, message: 'Password changed successfully' };
}

export async function updateUser(prevState: any, formData: FormData) {
  console.log("Updating user:", Object.fromEntries(formData.entries()));
  await new Promise(resolve => setTimeout(resolve, 1000));
  return { success: true, message: 'Profile updated successfully' };
}

export async function deactivateUser(userId: string) {
    console.log("Deactivating user:", userId);
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { success: true, message: 'User deactivated successfully' };
}
