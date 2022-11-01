import NextAuth, { type NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '@/utils/db/prisma';

type UserResponse = {
  name: string;
  username: string;
  id: string;
};

// type CLientSession = {
//   name?: string | null | undefined;
//   email?: string | null | undefined;
//   image?: string | null | undefined;
//   username?: string | null | undefined;
// };

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {},
      async authorize(credentials, req) {
        const { name, username, password, type } = credentials as {
          name?: string;
          username: string;
          password: string;
          type?: string;
        };

        if (type === 'login') {
          const loginEndpoint = process.env.NEXTAUTH_LOGIN;
          const res = await fetch(loginEndpoint, {
            method: 'POST',
            body: JSON.stringify({
              username,
              password
            }),
            headers: { 'Content-Type': 'application/json' }
          });

          const user: UserResponse = await res.json();

          if (res.ok && user) {
            return user;
          }
        }

        if (type === 'signup') {
          const signupEndpoint = process.env.NEXTAUTH_SIGNUP;
          const res = await fetch(signupEndpoint, {
            method: 'POST',
            body: JSON.stringify({
              name,
              username,
              password
            }),
            headers: { 'Content-Type': 'application/json' }
          });

          const user: UserResponse = await res.json();

          if (res.ok && user) {
            return user;
          }
        }
        return null;
      }
    })
  ],
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/login',
    signOut: '/signup'
  }
};

export default NextAuth(authOptions);
