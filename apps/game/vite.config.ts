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
            "@engine": path.resolve(__dirname, "../../packages/engine/src"),
            "@ui": path.resolve(__dirname, "../../packages/ui/src"),
            "@widgets": path.resolve(__dirname, "../../packages/widgets/src"),
        },
    },
});
