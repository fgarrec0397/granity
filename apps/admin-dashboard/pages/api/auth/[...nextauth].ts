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
            async authorize(credentials, req) {
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

                    // console.log(res, "res");
                    const user = await res.json();

                    console.log(user, "user");
                    // return user;
                    if (res.ok && user) {
                        return user;
                    }

                    Promise.reject(new Error("fail"));

                    // return "error";
                }
            },
        }),
    ],

    callbacks: {
        async signIn(params) {
            const isAllowedToSignIn = true;
            console.log(params, "params in sign in");

            if (isAllowedToSignIn) {
                return true;
            } else {
                // Return false to display a default error message
                return false;
                // Or you can return a URL to redirect to:
                // return '/unauthorized'
            }
        },
        async jwt({ token, user }) {
            return { ...token, ...user };
        },
        async session({ session, token, user }) {
            session.user = token;

            console.log(user, "user in session");

            return session;
        },
    },

    pages: {
        signIn: "/auth/login",
        error: "/auth/error",
    },
});
