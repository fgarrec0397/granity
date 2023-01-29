import { GranityEngineProvider } from "@granity/engine";
import { QueryClient, QueryClientProvider } from "@granity/helpers";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";

const container = document.getElementById("root") as Element | DocumentFragment;

const root = createRoot(container);

const queryClient = new QueryClient();

root.render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <GranityEngineProvider>
                <App />
            </GranityEngineProvider>
        </QueryClientProvider>
    </StrictMode>
);
