import reactRefresh from "@vitejs/plugin-react";
import path from "path";
import { defineConfig, PluginOption } from "vite";
import svgrPlugin from "vite-plugin-svgr";

export default defineConfig({
    build: {
        outDir: "build",
    },
    plugins: [
        reactRefresh() as PluginOption,
        svgrPlugin({
            svgrOptions: {
                icon: true,
            },
        }) as unknown as PluginOption,
    ],
    server: {
        proxy: {
            "/api": "http://localhost:5000",
        },
    },
    resolve: {
        alias: {
            "@app": path.resolve(__dirname, "./src/App"),
            "@features": path.resolve(__dirname, "./src/Features"),
            "@tests": path.resolve(__dirname, "./src/tests"),
            "@themes": path.resolve(__dirname, "./src/Themes"),
        },
    },
});
