
'use server';

import {redirect} from 'next/navigation';
import {cookies} from 'next/headers';

const API_BASE_URL = 'https://astramaan-be-1.onrender.com';

async function getAuthHeaders() {
  const authToken = cookies().get('auth_token')?.value;
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  if (authToken) {
    headers['Authorization'] = `Bearer ${authToken}`;
  }
  return headers;
}

export async function authenticate(prevState: any, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const requestBody = { email, password };
  console.log('[API Test] Sending request to:', `${API_BASE_URL}/api/v1/login`);
  console.log('[API Test] Request Body:', JSON.stringify(requestBody));

  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/login`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(requestBody),
    });

    console.log('[API Test] Response Status Code:', response.status);
    
    const responseData = await response.json();
    
    console.log('----------- API TEST RESULT -----------');
    console.log(JSON.stringify(responseData, null, 2));
    console.log('---------------------------------------');

    // For now, just return the raw data to see it on the client too
    return responseData;

  } catch (error) {
    console.error('[API Test] An error occurred during the API test:', error);
    return { success: false, error: 'Failed to connect to the API.' };
  }
}

export async function signup(prevState: any, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const phone = formData.get('phone') as string;
  const organization = formData.get('organization') as string;

  // In a real app, you'd call your backend API here.
  // Example:
  /*
  const response = await fetch(`${API_BASE_URL}/api/v1/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, phone, organization }),
  });
  if (!response.ok) {
    const errorData = await response.json();
    return { error: errorData.message || 'Signup failed' };
  }
  */

  // For now, we'll simulate success and redirect.
  // The OTP page will need the form data.
  const params = new URLSearchParams({
    email,
    phone,
    organization,
    password, // Note: In a real app, do not pass passwords in URLs.
    flow: 'signup',
  });
  redirect(`/otp-verification?${params.toString()}`);
}

export async function verifyOtp(prevState: any, formData: FormData) {
  // In a real app, you would send the OTP to your backend for verification.
  const flow = formData.get('flow');

  // Based on the flow, redirect to the appropriate next step.
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
  // In a real app, you would send the new password to your backend.
  redirect('/password-success');
}

export async function requestPasswordReset(prevState: any, formData: FormData) {
  const email = formData.get('email') as string;
  // In a real app, you would call your backend to initiate the password reset flow.
  console.log('Requesting password reset for:', email);
  // Redirect to OTP page for the forgot-password flow
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

  // In a real app, you'd call your backend API here.
  console.log('Changing password for', email);

  // For now, we'll simulate success.
  return {success: true, message: 'Password changed successfully.'};
}

export async function inviteUser(prevState: any, formData: FormData) {
  // Simulate API call
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
    // In a real app, you'd call your backend API here.
    // const response = await fetch(`${API_BASE_URL}/api/v1/projects/${projectId}`, { method: 'DELETE' });
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
