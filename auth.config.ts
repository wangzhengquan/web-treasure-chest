import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      // console.log('nextUrl', nextUrl);
      // console.log('nextUrl.searchParams', nextUrl.searchParams.toString());
      let callbackUrl = nextUrl.searchParams.get('callbackUrl') || '/dashboard';
      // console.log('callbackUrl', callbackUrl);
      if (callbackUrl === nextUrl.origin+'/' ) {
        callbackUrl = '/dashboard';
      }
      const isLoggedIn = !!auth?.user;
      const isOnLogin = nextUrl.pathname.startsWith('/login');
      if (isLoggedIn) {
        if (nextUrl.pathname === '/' || isOnLogin) {
          return Response.redirect(new URL(callbackUrl, nextUrl));
        }
        return true;
      } else if (isOnLogin){
        return true;
      }
      // return Response.redirect(new URL('/login', nextUrl));
      return false; // Redirect unauthenticated users to login page
      
    },
    // authorized({ auth, request: { nextUrl } }) {
    //   const isLoggedIn = !!auth?.user;
    //   const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
    //   if (isOnDashboard) {
    //     if (isLoggedIn) return true;
    //     return false; // Redirect unauthenticated users to login page
    //   } else if (isLoggedIn) {
    //     return Response.redirect(new URL('/dashboard', nextUrl));
    //   }
    //   return true;
    // },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;