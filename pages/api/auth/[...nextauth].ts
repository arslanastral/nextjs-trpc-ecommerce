import NextAuth, { type NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '@/lib/utils/db/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { randomUUID } from 'crypto';
import Cookies from 'cookies';
import { decode, encode } from 'next-auth/jwt';

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const data = requestWrapper(req, res);
  return await NextAuth(...data);
};

export default handler;

type UserResponse = {
  name: string;
  username: string;
  id: string;
};

type CLientSession = {
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
  username?: string | null | undefined;
};

export function requestWrapper(
  req: NextApiRequest,
  res: NextApiResponse
): [req: NextApiRequest, res: NextApiResponse, opts: NextAuthOptions] {
  const generateSessionToken = () => randomUUID();

  const fromDate = (time: number, date = Date.now()) => new Date(date + time * 1000);

  const adapter = PrismaAdapter(prisma);

  const opts: NextAuthOptions = {
    adapter: adapter,
    callbacks: {
      session({ session, user }) {
        if (session.user) {
          const userResponse: CLientSession = user;
          const userSession: CLientSession = session.user;
          userSession.username = userResponse.username;
        }
        return session;
      },
      async signIn({ user, account, profile, email, credentials }) {
        // Check if this sign in callback is being called in the credentials authentication flow.
        // If so, use the next-auth adapter to create a session entry in the database
        // signIn() is called after authorize() so we can safely assume the user is valid and already authenticated.
        // Remeber to return user.id from your custom login endpoint. This id is used to associate user with session.
        if (
          req.query.nextauth?.includes('callback') &&
          req.query.nextauth?.includes('credentials') &&
          req.method === 'POST'
        ) {
          if (user) {
            const sessionToken = generateSessionToken();
            const sessionMaxAge = 60 * 60 * 24 * 30;
            const sessionExpiry = fromDate(sessionMaxAge);

            const userId = user as UserResponse;

            await adapter.createSession({
              sessionToken: sessionToken,
              userId: userId.id,
              expires: sessionExpiry
            });

            const cookies = new Cookies(req, res);

            cookies.set('next-auth.session-token', sessionToken, {
              expires: sessionExpiry
            });
          }
        }

        return true;
      }
    },
    jwt: {
      encode: async ({ token, secret, maxAge }) => {
        if (
          req.query.nextauth?.includes('callback') &&
          req.query.nextauth.includes('credentials') &&
          req.method === 'POST'
        ) {
          const cookies = new Cookies(req, res);
          const cookie = cookies.get('next-auth.session-token');

          if (cookie) {
            return cookie;
          } else {
            return '';
          }
        }
        // Revert to default behaviour when not in the credentials provider callback flow
        return encode({ token, secret, maxAge });
      },
      decode: async ({ token, secret }) => {
        if (
          req.query.nextauth?.includes('callback') &&
          req.query.nextauth.includes('credentials') &&
          req.method === 'POST'
        ) {
          return null;
        }

        // Revert to default behaviour when not in the credentials provider callback flow
        return decode({ token, secret });
      }
    },
    // Configure one or more authentication providers
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

          console.log(password);

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
    cookies: {
      sessionToken: {
        name: `next-auth.session-token`,
        options: {
          httpOnly: true,
          sameSite: 'lax',
          path: '/',
          secure: true
        }
      }
    },
    pages: {
      signIn: '/login',
      signOut: '/signup'
    }
  };

  return [req, res, opts];
}
