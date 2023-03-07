/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    experimental: {
        appDir: true,
        transpilePackages: [
            "@granity-engine",
            "@granity-eslint-config",
            "@granity-helpers",
            "@granity-prettier-config",
            "@granity-ui",
            "@granity-widgets",
        ],
        modularizeImports: {
            lodash: {
                transform: "lodash/{{member}}",
            },
            // '@mui/material': {
            //   transform: '@mui/material/{{member}}'
            // },
            "@mui/lab": {
                transform: "@mui/lab/{{member}}",
            },
            "@mui/icons-material/?(((\\w*)?/?)*)": {
                transform: "@mui/icons-material/{{ matches.[1] }}/{{member}}",
            },
        },
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
