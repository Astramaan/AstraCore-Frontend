
'use server';

import {redirect} from 'next/navigation';
import {cookies} from 'next/headers';

const API_BASE_URL = 'https://astramaan-be-1.onrender.com';
const APP_URL = process.env.NODE_ENV === 'production' ? 'https://astramaan-be-1.onrender.com' : 'http://localhost:3000';


export async function authenticate(prevState: any, formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    const res = await fetch(`${APP_URL}/api/auth/login`, {
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
    
    cookies().set('auth_token', data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    });

    return { success: true, user: data.user, token: data.token };

  } catch (err: any) {
    console.error("Auth error:", err.message);
    if (err.cause?.code === 'ENOTFOUND') {
        return { success: false, message: "Network error: Could not reach the authentication server." };
    }
    return { success: false, message: err.message || "An unknown network error occurred." };
  }
}

export async function signup(prevState: any, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const phone = formData.get('phone') as string;
  const organization = formData.get('organization') as string;

  const params = new URLSearchParams({
    email,
    phone,
    organization,
    password, 
    flow: 'signup',
  });
  redirect(`/otp-verification?${params.toString()}`);
}

export async function verifyOtp(prevState: any, formData: FormData) {
  const flow = formData.get('flow');

  if (flow === 'signup' || flow === 'set-password') {
    const params = new URLSearchParams(
      Array.from(formData.entries()) as [string, string][]
    );
    redirect(`/create-password?${params.toString()}`);
  } else if (flow === 'forgot-password' || flow === 'change-password') {
    const params = new URLSearchParams(
      Array.from(formData.entries()) as [string, string][]
    );
    redirect(`/set-password?${params.toString()}`);
  } else {
    return {error: 'Invalid verification flow.'};
  }
}

export async function createPassword(prevState: any, formData: FormData) {
  redirect('/password-success');
}

export async function requestPasswordReset(prevState: any, formData: FormData) {
  const email = formData.get('email') as string;
  console.log('Requesting password reset for:', email);
  redirect(`/otp-verification?email=${email}&flow=forgot-password`);
}

export async function changePassword(prevState: any, formData: FormData) {
  const email = formData.get('email') as string;
  const currentPassword = formData.get('currentPassword') as string;
  const newPassword = formData.get('newPassword') as string;
  const confirmPassword = formData.get('confirmPassword') as string;

  if (newPassword !== confirmPassword) {
    return {success: false, message: 'New passwords do not match.'};
  }

  console.log('Changing password for', email);
  return {success: true, message: 'Password changed successfully.'};
}

export async function inviteUser(prevState: any, formData: FormData) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log('Inviting user with data:', Object.fromEntries(formData));
  return {success: true, message: 'Invitation sent successfully!'};
}

export async function addLead(prevState: any, formData: FormData) {
  console.log('Adding lead:', Object.fromEntries(formData));
  await new Promise((resolve) => setTimeout(resolve, 500));
  return {success: true, message: 'Lead added successfully.'};
}

export async function addMember(prevState: any, formData: FormData) {
  console.log('Adding member:', Object.fromEntries(formData));
  await new Promise((resolve) => setTimeout(resolve, 500));
  return {success: true, message: 'Member added successfully.'};
}

export async function addProject(prevState: any, formData: FormData) {
  console.log('Adding project:', Object.fromEntries(formData));
  await new Promise((resolve) => setTimeout(resolve, 500));
  return {success: true, message: 'Project added successfully.'};
}

export async function updateProject(prevState: any, formData: FormData) {
    console.log('Updating project:', Object.fromEntries(formData));
    await new Promise((resolve) => setTimeout(resolve, 500));
    return {success: true, message: 'Project updated successfully.'};
}

export async function deleteProject(projectId: string) {
    console.log('Deleting project:', projectId);
    await new Promise(res => setTimeout(res, 500));
    return { success: true, message: "Project deleted successfully." };
}

export async function updateUser(prevState: any, formData: FormData) {
    const userId = formData.get('id');
    console.log(`Updating user ${userId}:`, Object.fromEntries(formData));
    await new Promise(res => setTimeout(res, 500));
    return { success: true, message: "User updated successfully." };
}

export async function deactivateUser(userId: string) {
    console.log('Deactivating user:', userId);
    await new Promise(res => setTimeout(res, 500));
    return { success: true, message: "User deactivated successfully." };
}
