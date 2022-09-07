import reactRefresh from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import svgrPlugin from "vite-plugin-svgr";

export default defineConfig({
    build: {
        outDir: "build",
    },
    plugins: [
        reactRefresh(),
        svgrPlugin({
            svgrOptions: {
                icon: true,
            },
        }),
    ],
    server: {
        proxy: {
            "/api": "http://localhost:5000",
        },
    },
    resolve: {
        alias: {
            "@app": path.resolve(__dirname, "./src/App"),
            "@common": path.resolve(__dirname, "./src/App/Common"),
            "@core": path.resolve(__dirname, "./src/App/Core"),
            "@editor": path.resolve(__dirname, "./src/App/Editor"),
            "@scene": path.resolve(__dirname, "./src/App/Scene"),
            "@widgets": path.resolve(__dirname, "./src/App/Widgets"),
            "@features": path.resolve(__dirname, "./src/Features"),
        },
    },
});
