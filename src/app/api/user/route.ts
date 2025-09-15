
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request: Request) {
  try {
    const cookieStore = cookies();
    const userDataCookie = cookieStore.get('user-data');

    if (!userDataCookie) {
      return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
    }

    const userData = JSON.parse(userDataCookie.value);
    return NextResponse.json(userData);
  } catch (error) {
    console.error('Failed to get user data from cookie:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
