
"use server";

import { redirect } from 'next/navigation';

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const response = await fetch('http://localhost:4000/api/v1/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const responseData = await response.json();

    if (!response.ok) {
        return responseData.message || 'Login failed due to an unknown error.';
    }
    
    const userRole = responseData?.role?.name;

    if (userRole === 'platform_admin') {
        redirect('/platform/dashboard');
    } else if (userRole === 'organization_admin' || userRole === 'member') {
        redirect('/organization/home');
    } else {
        return 'Login successful, but user role is invalid.';
    }

  } catch (error) {
      if (error instanceof Error) {
        if ((error as any).type === 'NEXT_REDIRECT') {
          throw error;
        }
        console.error("Login Action Error:", error.message);
        // This could be a network error, DNS error, etc.
        return 'Could not connect to the login service. Please try again later.';
      }
      return 'An unexpected error occurred.';
  }
}

export async function signup(
  prevState: any,
  formData: FormData
) {
  const email = formData.get('email') as string;
  const phone = formData.get('phone') as string;
  const organization = formData.get('organization') as string;
  const password = formData.get('password') as string;
  
  try {
    const response = await fetch('http://localhost:4000/api/v1/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, phone, organization, password }),
    });

    const data = await response.json();
    if (!response.ok) {
      return { error: data.message || 'Failed to sign up.' };
    }
    
    // On success, redirect to OTP page
    const searchParams = new URLSearchParams({
      email,
      phone,
      organization,
      password,
    });
    redirect(`/otp-verification?${searchParams.toString()}`);

  } catch (error) {
    if (error instanceof Error && (error as any).type === 'NEXT_REDIRECT') {
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
    const email = formData.get('email') as string;
    const otpDigits = formData.getAll('otp') as string[];
    const otp = otpDigits.join('');
    
    const phone = formData.get('phone') as string;
    const organization = formData.get('organization') as string;
    const password = formData.get('password') as string;
    const flow = formData.get('flow') as string;

    try {
        const response = await fetch('http://localhost:4000/api/v1/verify-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, otp }),
        });
        
        const data = await response.json();
        if (!response.ok) {
            return { error: data.message || 'Failed to verify OTP.' };
        }

        // On success, redirect based on the flow
        const searchParams = new URLSearchParams();
        if(email) searchParams.set('email', email);
        if(phone) searchParams.set('phone', phone);
        if(organization) searchParams.set('organization', organization);
        if(password) searchParams.set('password', password);
        if(flow) searchParams.set('flow', flow);
        
        redirect(`/create-password?${searchParams.toString()}`);

    } catch (error) {
        if (error instanceof Error) {
            if ((error as any).type === 'NEXT_REDIRECT') {
                throw error;
            }
            return { error: 'An unexpected error occurred during OTP verification.' };
        }
        return { error: 'An unexpected error occurred.' };
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

export async function requestPasswordReset(
  prevState: any,
  formData: FormData
) {
  const email = formData.get('email') as string;
  try {
    const checkEmailResponse = await fetch('http://localhost:4000/api/v1/check-email-existed', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    
    const data = await checkEmailResponse.json();
    if (!checkEmailResponse.ok) {
      return { error: data.message || 'Failed to check email.' };
    }
    
    if (data.exists) {
        const sendOtpResponse = await fetch('http://localhost:4000/api/v1/send-otp-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
        });

        if (!sendOtpResponse.ok) {
            const errorData = await sendOtpResponse.json();
            return { error: errorData.message || 'Failed to send OTP.' };
        }

        const params = new URLSearchParams({ email, flow: 'change-password' });
        redirect(`/otp-verification?${params.toString()}`);
    } else {
        return { error: 'No account found with this email address.' };
    }

  } catch (error) {
    if (error instanceof Error && (error as any).type === 'NEXT_REDIRECT') {
      throw error;
    }
    console.error('Password reset request error:', error);
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
    const flow = formData.get('flow');

    let body;

    if (flow === 'change-password') {
        body = JSON.stringify({ email, password });
    } else {
        const phone = formData.get('phone');
        const organization = formData.get('organization');
        body = JSON.stringify({ email, password, phone, organization });
    }

    const response = await fetch('http://localhost:4000/api/v1/create-password', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: body,
    });
    
    const data = await response.json();
    if (!response.ok) {
        return { error: data.message || 'Failed to create password.' };
    }
    
    redirect('/password-success');
  } catch (error) {
     if (error instanceof Error && (error as any).type === 'NEXT_REDIRECT') {
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
    const email = formData.get('email') as string;
    const role = formData.get('role') as string;

    if (!email || !role) {
        return { success: false, message: 'Email and role are required.' };
    }

    try {
        const response = await fetch('http://localhost:4000/api/v1/org-users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, role }),
        });
        
        const data = await response.json();
        if (!response.ok) {
            return { success: false, message: data.message || 'Failed to send invitation.' };
        }

        return { success: true, message: 'Invitation sent successfully!' };
    } catch (error) {
        console.error('Invite error:', error);
        return { success: false, message: 'An unexpected error occurred.' };
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

export async function updateProject(
  prevState: any,
  formData: FormData
) {
    const projectId = formData.get('id') as string;
    if (!projectId) {
        return { success: false, message: 'Project ID is missing.' };
    }

    const payload: Record<string, any> = {};
    for (const [key, value] of formData.entries()) {
        if (key !== 'id') {
            payload[key] = value;
        }
    }

    try {
        const response = await fetch(`http://localhost:4000/api/v1/org-clients/${projectId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        const data = await response.json();
        if (!response.ok) {
            return { success: false, message: data.message || 'Failed to update project.' };
        }

        return { success: true, message: 'Project updated successfully!' };
    } catch (error) {
        console.error('Update project error:', error);
        return { success: false, message: 'An unexpected error occurred.' };
    }
}

export async function deleteProject(projectId: string) {
    try {
        const response = await fetch(`http://localhost:4000/api/v1/org-clients/${projectId}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            const errorData = await response.json();
            return { success: false, message: errorData.message || 'Failed to delete project.' };
        }

        return { success: true, message: 'Project deleted successfully!' };
    } catch (error) {
        console.error('Delete project error:', error);
        return { success: false, message: 'An unexpected error occurred.' };
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

export async function inviteUser(
  prevState: any,
  formData: FormData
) {
  const email = formData.get('email') as string;
  const role = formData.get('role') as string;

  if (!email || !role) {
    return { success: false, message: 'Email and role are required.' };
  }

  try {
    const response = await fetch('http://localhost:4000/api/v1/invites', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, role }),
    });
    
    const data = await response.json();
    if (!response.ok) {
      return { success: false, message: data.message || 'Failed to send invitation.' };
    }

    return { success: true, message: 'Invitation sent successfully!' };
  } catch (error) {
    console.error('Invite error:', error);
    return { success: false, message: 'An unexpected error occurred.' };
  }
}

export async function deactivateUser(userId: string) {
    try {
        // In a real app, you would make an API call to deactivate the user.
        // For example:
        // const response = await fetch(`http://localhost:4000/api/v1/users/${userId}/deactivate`, {
        //     method: 'POST',
        // });
        // if (!response.ok) {
        //     const errorData = await response.json();
        //     return { success: false, message: errorData.message || 'Failed to deactivate user.' };
        // }
        console.log(`Deactivating user ${userId}`);
        return { success: true, message: 'User deactivated successfully.' };
    } catch (error) {
        console.error('Deactivation error:', error);
        return { success: false, message: 'An unexpected error occurred during deactivation.' };
    }
}


export async function updateUser(
  prevState: any,
  formData: FormData
) {
    const memberId = formData.get('id') as string;
    
    const payload: Record<string, any> = {};
    for (const [key, value] of formData.entries()) {
        if (key !== 'id') {
            payload[key] = value;
        }
    }

    try {
        const response = await fetch(`http://localhost:4000/api/v1/org-users/${memberId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        const data = await response.json();
        if (!response.ok) {
            return { success: false, message: data.message || 'Failed to update user.' };
        }

        return { success: true, message: 'User updated successfully!' };
    } catch (error) {
        console.error('Update user error:', error);
        return { success: false, message: 'An unexpected error occurred.' };
    }
}
