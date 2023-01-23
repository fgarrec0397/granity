import { GranityEngineProvider } from "@granity/engine";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";

const container = document.getElementById("root") as Element | DocumentFragment;

const root = createRoot(container);

root.render(
    <StrictMode>
        <GranityEngineProvider>
            <App />
        </GranityEngineProvider>
    </StrictMode>
);
