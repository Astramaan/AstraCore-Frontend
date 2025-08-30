
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

    const data = await response.json();

    if (!response.ok) {
        // Assuming the API returns a message field with the error
        return data.message || 'An unexpected error occurred.';
    }

    // Assuming a successful login will not have an error message
    // and we can redirect. You might want to handle tokens or sessions here.
    
  } catch (error) {
      if (error instanceof Error) {
        return error.message;
      }
      return 'An unexpected error occurred.';
  }

  redirect('/organization/home');
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
    // We will now redirect to the OTP page on successful "signup".
    redirect('/otp-verification');

  } catch (error) {
    return { error: 'An unexpected error occurred during signup.' };
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

        if (otp !== '1234') { // Mock OTP check
            return { error: 'Invalid OTP. Please try again.' };
        }
        
    } catch (error) {
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
    console.log(`Creating new password.`);
    // In a real app, you would save the new password for the user.
    redirect('/password-success');
  } catch (error) {
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
