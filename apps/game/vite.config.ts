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
            "@granity-engine": path.resolve(__dirname, "../../packages/@granity-engine/src"),
            "@granity-ui": path.resolve(__dirname, "../../packages/@granity-ui/src"),
            "@granity-widgets": path.resolve(__dirname, "../../packages/@granity-widgets/src"),
        },
    },
});
