import { mergeConfig } from "vite";
import { defineConfig } from "vitest/config";

import viteConfig from "./vite.config";

export default mergeConfig(
    viteConfig,
    defineConfig({
        test: {
            globals: true,
            environment: "jsdom",
            setupFiles: "./src/setupTests.ts",
            coverage: {
                reporter: ["text", "html"],
                exclude: ["node_modules/", "src/setupTests.ts"],
            },
        },
    })
);
