import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import { User } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "jsmith",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials, req) {
        const { username, password } = credentials as any;
        const res = await fetch("/server/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
          }),
        });

        const user = await res.json();

        console.log({ user });

        if (res.ok && user) {
          return user;
        } else return null;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      session.user = token;

      return session;
    },
  },

  pages: {
    signIn: "/auth/login",
    error: '/auth/error',
  },
};

export default NextAuth(authOptions);
