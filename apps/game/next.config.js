/** @type {import('next').NextConfig} */

const withPWA = require("@granity/next-pwa")({
    dest: "public",
    // pwa: {
    // },
    buildExcludes: [/app-build-manifest\.json/],
    // exclude: [/_next\/app-build-manifest.json/],
    // disable: process.env.NODE_ENV === "development",
});

const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    experimental: {
        appDir: true,
        transpilePackages: [
            "@granity/engine",
            "@granity/eslint-config",
            "@granity/helpers",
            "@granity/prettier-config",
            "@granity/three",
            "@granity/ui",
            "@granity/widgets",
            "@react-three/drei",
            "@mui/material",
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

module.exports = withPWA(nextConfig);
