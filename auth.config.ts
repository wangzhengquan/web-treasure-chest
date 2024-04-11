import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      // console.log('nextUrl=', nextUrl);
      // if nextUrl is not empty and contains '?callbackUrl=' take the value of callbackUrl
      // if nextUrl is empty, set it to '/'
      const callbackUrl = nextUrl.searchParams.get('callbackUrl') || '/';
      // console.log('callbackUrl=', callbackUrl);
      const isLoggedIn = !!auth?.user;
      const isOnLogin = nextUrl.pathname.startsWith('/login');
      if (isOnLogin) {
        if (isLoggedIn) {
          return Response.redirect(new URL(callbackUrl, nextUrl));
        }
        return true;
      }
      if (isLoggedIn) return true;
      return false; // Redirect unauthenticated users to login page

      // if (isOnDashboard) {
      //   if (isLoggedIn) return true;
      //   return false; // Redirect unauthenticated users to login page
      // } else if (isLoggedIn) {
      //   return Response.redirect(new URL('/dashboard', nextUrl));
      // }
      // return true;
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