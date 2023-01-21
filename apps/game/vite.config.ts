import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            "/api": "http://localhost:5000",
        },
    },
    resolve: {
        alias: {
            // "@engine": "/engine/src/api",
            "@app": "../engine/src/App",
            "@features": "../engine/src/Features",
        },
    },
});
