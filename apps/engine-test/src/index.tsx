import { GranityEngineProvider } from "@granity/engine";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import widgetsModules from "./Features/Widgets";

const container = document.getElementById("root") as Element | DocumentFragment;

const root = createRoot(container);

root.render(
    <StrictMode>
        <GranityEngineProvider widgetsModules={widgetsModules}>
            <App />
        </GranityEngineProvider>
    </StrictMode>
);
