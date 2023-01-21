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
            "@app": path.resolve(__dirname, "../engine/src/App"),
            "@features": path.resolve(__dirname, "../engine/src/Features"),
            "@themes": path.resolve(__dirname, "../engine/src/Themes"),
        },
    },
});
