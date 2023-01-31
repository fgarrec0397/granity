import "./index.css";

import { EngineConfig, GranityEngineProvider } from "@granity/engine";
import { QueryClient, QueryClientProvider } from "@granity/helpers";
import { widgetsModules } from "@granity/widgets";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";

const container = document.getElementById("root") as Element | DocumentFragment;

const root = createRoot(container);

const queryClient = new QueryClient();

const config: EngineConfig = {
    widgetsModules,
};

root.render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <GranityEngineProvider config={config}>
                <App />
            </GranityEngineProvider>
        </QueryClientProvider>
    </StrictMode>
);
