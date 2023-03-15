import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
    resolve: {
        alias: {
            "@widgets": path.resolve(__dirname, "./src"),
        },
    },
});
