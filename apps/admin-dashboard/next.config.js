/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    experimental: {
        appDir: true,
        transpilePackages: [
            "@mui/material",
            "@granity/engine",
            "@granity/eslint-config",
            "@granity/helpers",
            "@granity/prettier-config",
            "@granity/ui",
            "@granity/widgets",
        ],
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
