
"use server";

import { redirect } from 'next/navigation';

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    // This is a mock authentication.
    // In a real app, you would validate credentials against a database.
    if (email === 'platform@admin.com' && password === 'password') {
        redirect('/platform/dashboard');
    } else if (email === 'user@example.com' && password === 'password') {
        redirect('/organization/home');
    } else {
        return 'Invalid credentials.';
    }
  } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('NEXT_REDIRECT')) {
            throw error;
        }
        return 'An unexpected error occurred during login.';
      }
      return 'An unexpected error occurred.';
  }
}

export async function signup(
  prevState: any,
  formData: FormData
) {
  try {
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const organization = formData.get('organization') as string;
    const password = formData.get('password') as string;
    
    // Mock action: Redirect to OTP page
    redirect(`/otp-verification?email=${encodeURIComponent(email)}&phone=${encodeURIComponent(phone)}&organization=${encodeURIComponent(organization)}&password=${encodeURIComponent(password)}`);

  } catch (error) {
    if (error instanceof Error && error.message.includes('NEXT_REDIRECT')) {
      throw error;
    }
    console.error('Signup error:', error);
    return { error: 'An unexpected error occurred during signup.' };
  }
}

export async function verifyOtp(
    prevState: { error?: string } | undefined,
    formData: FormData
): Promise<{ error?: string } | undefined> {
    const phone = formData.get('phone') as string;
    const organization = formData.get('organization') as string;
    const password = formData.get('password') as string;
    const email = formData.get('email') as string;
    const flow = formData.get('flow') as string;

    // In a real app, you'd verify the OTP here.
    // For now, we'll just redirect.

    const searchParams = new URLSearchParams();
    if(email) searchParams.set('email', email);
    if(phone) searchParams.set('phone', phone);
    if(organization) searchParams.set('organization', organization);
    if(password) searchParams.set('password', password);
    if(flow) searchParams.set('flow', flow);

    redirect(`/create-password?${searchParams.toString()}`);
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

export async function requestPasswordReset(
  prevState: any,
  formData: FormData
) {
  try {
    const email = formData.get('email');
    console.log(`Requesting password reset for: ${email}`);
    // In a real app, you would send a reset link to the email.
    return { success: 'If an account with this email exists, a password reset link has been sent.' };
  } catch (error) {
    return { error: 'Failed to request password reset.' };
  }
}

export async function createPassword(
  prevState: any,
  formData: FormData
) {
  try {
    const password = formData.get('password');
    // In a real app, you would save the password to a database.
    console.log(`Creating password: ${password}`);
    redirect('/password-success');
  } catch (error) {
     if (error instanceof Error && error.message.includes('NEXT_REDIRECT')) {
      throw error;
    }
    console.error('Create Password error:', error);
    return { error: 'Failed to create new password.' };
  }
}


export async function addMember(
  prevState: any,
  formData: FormData
) {
    try {
        const name = formData.get('member-name');
        const email = formData.get('member-email');
        console.log(`Adding member: ${name} (${email})`);
        // In a real app, you would save this to a database.
        return { success: true, message: 'Member added successfully!' };
    } catch (error) {
        return { success: false, message: 'Failed to add member.' };
    }
}

export async function addProject(
  prevState: any,
  formData: FormData
) {
    try {
        const name = formData.get('name');
        console.log(`Adding project: ${name}`);
        // In a real app, you would save this to a database.
        return { success: true, message: 'Project added successfully!' };
    } catch (error) {
        return { success: false, message: 'Failed to add project.' };
    }
}

export async function addLead(
  prevState: any,
  formData: FormData
) {
    try {
        const name = formData.get('name');
        console.log(`Adding lead: ${name}`);
        // In a real app, you would save this to a database.
        return { success: true, message: 'Lead added successfully!' };
    } catch (error) {
        return { success: false, message: 'Failed to add lead.' };
    }
}
