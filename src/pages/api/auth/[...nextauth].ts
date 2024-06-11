import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';

import * as jose from 'jose';

// console.log(process.env.GOOGLE_CLIENT_ID);

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      id: 'planriean',
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'planriean-api',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: {
          label: 'username',
          type: 'text',
          placeholder: 'pluto@example.com',
        },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials, req) {
        const payload = {
          username: credentials?.username,
          password: credentials?.password,
        };

        const res = await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + '/auth/login', {
          method: 'POST',
          body: JSON.stringify(payload),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const user = await res.json();
        if (!res.ok) {
          throw new Error(user.message);
        }
        // If no error and we have user data, return it
        if (res.ok && user) {
          const res_user = await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + '/user', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: user.token,
            },
          });

          const user_final = await res_user.json();
          if (!res_user.ok) {
            throw new Error(user_final.message);
          }
          return user_final.user;
        }

        // Return null if user data could not be retrieved
        return null;
      },
    }),
    // ...add more providers here
  ],
  session: {
    strategy: 'jwt',
    maxAge: 1 * 24 * 60 * 60, // 1 day
  },
  jwt: {
    // JWT encoding and decoding configurations
  },
  callbacks: {
    async session({ session, token, user }) {
      if (token) {
        if (token.username != '') {
          // console.log(token);
          let user_fin: any = token;
          user_fin = {
            ...user_fin.user,
            name: user_fin.user.std_name + ' ' + user_fin.user.std_surname,
          };
          session.user = user_fin;
          let tokentemp: any = token;
          session.accessToken = tokentemp.accessToken;
          return session;
        }

        let login = await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + '/auth/token', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
            Authorization: token.accessToken as string,
          },
        }).then((response) => response.json());

        login.user = {
          ...login.user,
          name: login.user.std_name + ' ' + login.user.std_surname,
        };

        session.user = login.user;
        let tokentemp: any = token;
        session.accessToken = tokentemp.accessToken;
      }
      return session;
    },

    async jwt({ token, user, trigger, account, session }) {
      // console.log(user);
      if (trigger === 'update') {
        return { ...token, ...session };
      }

      // console.log(token, user, trigger, account, session)
      if (account && user) {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const alg = 'HS256';
        const jwt = await new jose.SignJWT({ ...user }).setProtectedHeader({ alg }).sign(secret);
        // session.accessToken = jwt;
        // console.log("test", account)
        if (account.provider == 'planriean') {
          let user_fin: any = user;
          user_fin = {
            ...user_fin,
            image: user.image,
            name: user_fin.std_name + ' ' + user_fin.std_surname,
          };
          return {
            accessToken: jwt,
            user: user_fin,
          };
        }

        let login = await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + '/auth/token', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
            Authorization: jwt,
          },
        }).then((response) => response.json());
        // console.log(login)
        login.user = {
          ...login.user,
          image: user.image,
          name: login.user.std_name + ' ' + login.user.std_surname,
        };

        return {
          accessToken: jwt,
          user: login.user,
        };
      }
      return token;
    },
  },
  pages: {
    signIn: '/login',
    error: '/login?error=msg',
  },
};

export const auth = NextAuth(authOptions);

export default auth;
