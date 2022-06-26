import "./index.css";
import "antd/dist/antd.css";

import App from "@app/App";
import AppProviders from "@app/AppProviders";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

const container = document.getElementById("root") as Element | DocumentFragment;

const root = createRoot(container);

root.render(
    <StrictMode>
        <AppProviders>
            <App />
        </AppProviders>
    </StrictMode>
);
