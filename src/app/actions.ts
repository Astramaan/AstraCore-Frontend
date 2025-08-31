
"use server";

import { redirect } from 'next/navigation';

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!email || !password) {
        return 'Please provide both email and password.';
    }

    // In a real app, you would use fetch to call your backend API for authentication.
    // Note: localhost endpoints won't be reachable from the Next.js server environment in production.
    // This is a conceptual implementation.
    const response = await fetch('http://localhost:4000/api/v1/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });
    
    if (!response.ok) {
        const errorData = await response.json();
        return errorData.message || 'Invalid credentials.';
    }
    
    const data = await response.json();
    
    // Assuming the API returns a role or user type to determine the redirect path
    if (data.role === 'platform_admin') {
        redirect('/platform/dashboard');
    } else {
        redirect('/organization/home');
    }
    
  } catch (error) {
      if (error instanceof Error) {
        // This is a special error thrown by Next.js to trigger a redirect.
        // We must re-throw it to allow the redirect to happen.
        if (error.message === 'NEXT_REDIRECT') {
            throw error;
        }
        // Handle network errors or cases where the API is down
        if (error.message.includes('fetch failed')) {
            return "Could not connect to the authentication service. Please try again later.";
        }
        return error.message;
      }
      return 'An unexpected error occurred.';
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

    // In a real app, you would use fetch to call your backend API
    // Note: localhost endpoints won't be reachable from the Next.js server environment in production.
    // This is a conceptual implementation.
    
    // 1. Check if email exists
    const checkEmailRes = await fetch('http://localhost:4000/api/v1/check-email-existed', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    if (checkEmailRes.status === 409) { // Assuming 409 Conflict for existing email
      return 'An account with this email already exists.';
    }

    // 2. Send OTP
    const otpRes = await fetch('http://localhost:4000/api/v1/send-otp-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    
    if (!otpRes.ok) {
        const errorData = await otpRes.json();
        return errorData.message || 'Failed to send OTP.';
    }

    // For now, we'll continue to redirect to OTP verification page.
    // In a real app, you might store the other form data in a session or cookie.
    redirect('/otp-verification');

  } catch (error) {
    if (error instanceof Error && error.message === 'NEXT_REDIRECT') {
      throw error;
    }
    console.error('Signup error:', error);
    return 'An unexpected error occurred during signup.';
  }
}

export async function verifyOtp(
    prevState: { error?: string } | undefined,
    formData: FormData
): Promise<{ error?: string } | undefined> {
    try {
        const otp = Array.from(formData.values()).join('');
        console.log(`Verifying OTP: ${otp}`);

        if (otp.length < 4 || !/^\d+$/.test(otp)) {
          return { error: 'Invalid OTP format. Please enter 4 digits.' };
        }
        
        // In a real app, you'd also pass the user identifier (e.g., email from session)
        const verifyRes = await fetch('http://localhost:4000/api/v1/verify-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ otp /*, email: userEmail */ }),
        });
        
        if (!verifyRes.ok) {
            const errorData = await verifyRes.json();
            return { error: errorData.message || 'Invalid OTP. Please try again.' };
        }

    } catch (error) {
        if (error instanceof Error && error.message === 'NEXT_REDIRECT') {
          throw error;
        }
        console.error('OTP Verification error:', error);
        return { error: 'Failed to verify OTP.' };
    }
    // Redirect on success
    redirect('/create-password');
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
  prevState: string | undefined,
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
  prevState: string | undefined,
  formData: FormData
) {
  try {
    const password = formData.get('password');
    // In a real app, you'd also pass the user identifier (e.g., email from session)
    const createPassRes = await fetch('http://localhost:4000/api/v1/create-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password /*, email: userEmail */ }),
    });

    if (!createPassRes.ok) {
        const errorData = await createPassRes.json();
        return { error: errorData.message || 'Failed to create password.' };
    }

    redirect('/password-success');
  } catch (error) {
     if (error instanceof Error && error.message === 'NEXT_REDIRECT') {
      throw error;
    }
    console.error('Create Password error:', error);
    return { error: 'Failed to create new password.' };
  }
}


export async function addEmployee(
  prevState: any,
  formData: FormData
) {
    try {
        const name = formData.get('employee-name');
        const email = formData.get('employee-email');
        console.log(`Adding employee: ${name} (${email})`);
        // In a real app, you would save this to a database.
        return { success: true, message: 'Employee added successfully!' };
    } catch (error) {
        return { success: false, message: 'Failed to add employee.' };
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
