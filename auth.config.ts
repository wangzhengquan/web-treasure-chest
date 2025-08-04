import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      console.log('nextUrl', nextUrl);
      console.log('nextUrl.searchParams', nextUrl.searchParams.toString());
      let callbackUrl = nextUrl.searchParams.get('callbackUrl') || '/dashboard';
      console.log('callbackUrl', callbackUrl);
      if (callbackUrl === nextUrl.origin + '/') {
        callbackUrl = '/dashboard';
      }
      // console.log('callbackUrl', callbackUrl);
      const isLoggedIn = !!auth?.user;
      const isOnLogin = nextUrl.pathname.startsWith('/login');
      if (isLoggedIn) {
        if (nextUrl.pathname === '/' || isOnLogin) {
          return Response.redirect(new URL(callbackUrl, nextUrl));
        }
        return true;
      } else if (isOnLogin) {
        return true;
      }
      // return Response.redirect(new URL('/login', nextUrl));
      return false; // Redirect unauthenticated users to login page
    },
     
  },
  providers: [
    // added later in auth.ts since it requires bcrypt which is only compatible with Node.js
    // while this file is also used in non-Node.js environments
  ],
} satisfies NextAuthConfig;
