import { EngineConfig, GranityEngineProvider, ScenesDictionary } from "@granity/engine";
import { QueryClient, QueryClientProvider } from "@granity/helpers";
import { widgetsModules } from "@granity/widgets";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// const widgetsModules = import("@granity/widgets")
//     .then((module) => {
//         return { default: module.widgetsModules };
//     })
//     .finally(() => {
//         return [];
//     }) as any;
import App from "./App";

const container = document.getElementById("root") as Element | DocumentFragment;

const root = createRoot(container);

export const postScenes = async (scenes: ScenesDictionary) => {
    const rawResponse = await fetch("api/scene", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(scenes),
    });

    try {
        if (!rawResponse.ok) {
            throw new Error("An error occured.");
        }

        return {
            success: true,
        };
    } catch (error: any) {
        return {
            success: false,
            errorMessage: error,
        };
    }
};

const config: EngineConfig = {
    widgetsModules,
    onSave: async (scenes) => {
        if (scenes) {
            const response = await postScenes(scenes);

            if (!response.success) {
                return {
                    status: false,
                    message: response.errorMessage as string,
                };
            }

            if (response.success) {
                return {
                    status: true,
                    message: "Scenes saved with success!",
                };
            }
        }

        return {
            status: false,
            message: "An error occured",
        };
    },
};

const queryClient = new QueryClient();

root.render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <GranityEngineProvider config={config}>
                <App />
            </GranityEngineProvider>
        </QueryClientProvider>
    </StrictMode>
);
