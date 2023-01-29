/// <reference types="vitest" />
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import svgrPlugin from "vite-plugin-svgr";

export default defineConfig({
    build: {
        outDir: "build",
    },
    plugins: [
        react(),
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
            "@granity-engine": path.resolve(__dirname, "../../packages/@granity-engine/src"),
        },
    },
    test: {
        globals: true,
        environment: "jsdom",
        setupFiles: "./src/setupTests.ts",
        coverage: {
            reporter: ["text", "html"],
            exclude: ["node_modules/", "src/setupTests.ts"],
        },
    },
});