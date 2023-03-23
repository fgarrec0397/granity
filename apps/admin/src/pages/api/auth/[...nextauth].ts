import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
    providers: [
        CredentialsProvider({
            id: "username-login",
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
            async authorize(credentials) {
                if (credentials) {
                    const { username, password } = credentials;

                    const res = await fetch("http://localhost:5000/auth/login", {
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

                    if (res.ok && user) {
                        return user;
                    }

                    Promise.reject(new Error("fail"));
                }
            },
        }),
    ],

    callbacks: {
        async signIn() {
            const isAllowedToSignIn = true;

            if (isAllowedToSignIn) {
                return true;
            } else {
                return false;
            }
        },
        async jwt({ token, user }) {
            return { ...token, ...user };
        },
        async session({ session, token }) {
            session.user = token;
            return session;
        },
    },

    pages: {
        signIn: "/auth/login",
        error: "/auth/error",
    },
});
