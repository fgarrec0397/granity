import { withAuth } from "next-auth/middleware";

export default withAuth({
    callbacks: {
        authorized: ({ token }) => !!token,
    },
    pages: {
        signIn: "/auth/login",
        error: "/auth/error",
    },
});

export const config = {
    matcher: ["/admin/:path*", "/user/:path*"],
};
