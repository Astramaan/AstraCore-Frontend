"use server";

import { redirect } from 'next/navigation';

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    // This is a mock authentication.
    // In a real application, you would validate credentials against a database or auth provider.
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!email || !password) {
        return { error: 'Please provide both email and password.'}
    }

    console.log(`Attempting to log in with email: ${email}`);

    // Simulate a successful login
    redirect('/dashboard');
  } catch (error) {
      if((error as Error).message.includes('credentialssignin')) {
          return { error: 'Invalid credentials.' };
      }
      return { error: 'An unexpected error occurred.' };
  }
}

export async function signup(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const organization = formData.get('organization') as string;
    const password = formData.get('password') as string;

    console.log(`Attempting to sign up with:`, { email, phone, organization });
    
    // In a real app, you would create a user in a database.
    // We will just redirect to the dashboard on successful "signup".
    redirect('/dashboard');

  } catch (error) {
    return { error: 'An unexpected error occurred during signup.' };
  }
}


export async function createSnag(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    const title = formData.get('title');
    console.log(`Creating snag: ${title}`);
    // In a real app, you would save this to a database.
    return { success: 'Snag reported successfully!' };
  } catch (error) {
    return { error: 'Failed to report snag.' };
  }
}
