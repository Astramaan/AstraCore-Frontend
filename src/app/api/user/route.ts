
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const cookieStore = await cookies();
    const userDataCookie = cookieStore.get('user-data');

    if (!userDataCookie) {
      return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
    }

    const userData = JSON.parse(userDataCookie.value);
    return NextResponse.json({ user: userData });

  } catch (error) {
    console.error("Failed to get user data from cookie:", error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
