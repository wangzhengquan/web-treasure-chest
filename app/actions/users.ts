'use server';
import { sql } from '@app/lib/db';
import {
  User,
} from '@app/types/db';
import { unstable_noStore as noStore } from 'next/cache';
import { signIn, signOut } from '@/auth';
import { AuthError } from 'next-auth';

export async function getUser(email: string) {
  noStore();

  try {
    const users = await sql`SELECT * FROM users WHERE email=${email}`;
    return users[0] as User;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}


// =================== login =======================
export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export async function logout() {
  'use server';
  // await signOut({ redirectTo: '/' });
  await signOut();
}
