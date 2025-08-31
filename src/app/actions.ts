
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

    const response = await fetch('http://localhost:4000/api/v1/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });
    
    if (!response.ok) {
        try {
            const errorData = await response.json();
            return errorData.message || 'Invalid credentials.';
        } catch (e) {
            return 'Invalid credentials.';
        }
    }
    
    const data = await response.json();
    
    if (data.role === 'platform_admin') {
        redirect('/platform/dashboard');
    } else {
        redirect('/organization/home');
    }
    
  } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('NEXT_REDIRECT')) {
            throw error;
        }
        if (error.message.includes('fetch failed')) {
            return "Could not connect to the authentication service. Please try again later.";
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

     const checkEmailRes = await fetch('http://localhost:4000/api/v1/check-email-existed', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    if (checkEmailRes.status === 409) {
      return { error: 'An account with this email already exists.' };
    }

    const otpRes = await fetch('http://localhost:4000/api/v1/send-otp-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    
    if (!otpRes.ok) {
        const errorData = await otpRes.json();
        return { error: errorData.message || 'Failed to send OTP.' };
    }

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
    try {
        const otp = Array.from(formData.getAll('otp')).join('');
        const email = formData.get('email') as string;

        if (otp.length < 4 || !/^\d+$/.test(otp)) {
          return { error: 'Invalid OTP format. Please enter 4 digits.' };
        }
        
        const verifyRes = await fetch('http://localhost:4000/api/v1/verify-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ otp, email }),
        });
        
        if (!verifyRes.ok) {
            const errorData = await verifyRes.json();
            return { error: errorData.message || 'Invalid OTP. Please try again.' };
        }

    } catch (error) {
        if (error instanceof Error && error.message.includes('NEXT_REDIRECT')) {
          throw error;
        }
        console.error('OTP Verification error:', error);
        return { error: 'Failed to verify OTP.' };
    }
    
    const phone = formData.get('phone') as string;
    const organization = formData.get('organization') as string;
    const password = formData.get('password') as string;
    const email = formData.get('email') as string;

    redirect(`/create-password?email=${encodeURIComponent(email)}&phone=${encodeURIComponent(phone)}&organization=${encodeURIComponent(organization)}&password=${encodeURIComponent(password)}`);
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
    const email = formData.get('email');
    const phone = formData.get('phone');
    const organization = formData.get('organization');

    const createPassRes = await fetch('http://localhost:4000/api/v1/create-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, email, phone, organization }),
    });

    if (!createPassRes.ok) {
        const errorData = await createPassRes.json();
        return { error: errorData.message || 'Failed to create password.' };
    }

    redirect('/password-success');
  } catch (error) {
     if (error instanceof Error && error.message.includes('NEXT_REDIRECT')) {
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
