/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    transpilePackages: [
        "@granity/engine",
        "@granity/eslint-config",
        "@granity/helpers",
        "@granity/prettier-config",
        "@granity/ui",
        "@granity/widgets",
    ],
    experimental: {
        appDir: true,
    },
    async rewrites() {
        return [
            {
                source: "/server/:path*",
                destination: "http://localhost:5000/:path*",
            },
        ];
    },
};

module.exports = nextConfig;
