import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import * as jose from 'jose'

export const authOptions:NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
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
        let login = await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT+"/auth/token", {
          method: 'POST',
          headers: {
              'Content-type': 'application/json',
              'Authorization': token.accessToken as string
          },
        }).then((response) => response.json())
        
        login.user = {
          ...login.user,
          image: login.user.img,
          name: login.user.std_name + " " + login.user.std_surname
        }
        
        session.user = login.user
        let tokentemp:any = token;
        session.accessToken = tokentemp.accessToken
      }
      return session;
    },

    async jwt({ token, user, trigger, account, session }) {
      if(trigger === "update"){
        return {...token, ...session}
      }

      // console.log(token, user, trigger, account, session)
      if (account && user) {
        const secret = new TextEncoder().encode(
          process.env.JWT_SECRET,
        )
        const alg = 'HS256'
        const jwt = await new jose.SignJWT({...user})
          .setProtectedHeader({ alg })
          .sign(secret)
        // session.accessToken = jwt;
  
        let login = await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT+"/auth/token", {
          method: 'POST',
          headers: {
              'Content-type': 'application/json',
              'Authorization': jwt
          },
        }).then((response) => response.json())
        // console.log(login)
        login.user = {
          ...login.user,
          image: login.user.img,
          name: login.user.std_name + " " + login.user.std_surname
        }

        return {
          accessToken: jwt,
          user: login.user,
        }
      }
      return token;
    },
  },
  pages: {
    // signIn: '/login', // Custom sign-in page
  },
}

export const auth = NextAuth(authOptions)

export default auth