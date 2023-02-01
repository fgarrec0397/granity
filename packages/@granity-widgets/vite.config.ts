import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
    resolve: {
        alias: {
            "@granity-widgets": path.resolve(__dirname, "./src"),
        },
    },
});
