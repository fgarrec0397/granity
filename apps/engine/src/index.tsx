import { GranityEngineProvider, ScenesDictionary, WidgetModules } from "@granity/engine";
import { QueryClient, QueryClientProvider } from "@granity/helpers";
import { Toaster } from "@granity/ui";
import { EngineConfig } from "@granity-engine/App/Core/_actions/coreTypes";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import widgets from "./Features/Widgets";

const container = document.getElementById("root") as Element | DocumentFragment;

const root = createRoot(container);

const widgetsModules: WidgetModules[] = [];

for (const path in widgets) {
    const { widget } = widgets[path] as any;
    widgetsModules.push(widget);
}

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
                Toaster.toast.error(response.errorMessage);
            }

            if (response.success) {
                Toaster.toast.success("Scenes saved with success!");
            }
        }
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
