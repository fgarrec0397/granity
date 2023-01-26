import { GranityEngineProvider, WidgetModules } from "@granity/engine";
import { EngineOptions } from "@granity-engine/App/Core/_actions/coreTypes";
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

const engine: EngineOptions = {
    widgetsModules,
};

root.render(
    <StrictMode>
        <GranityEngineProvider engine={engine}>
            <App />
        </GranityEngineProvider>
    </StrictMode>
);
