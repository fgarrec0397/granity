import "./index.css";
import "antd/dist/antd.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App/App";
import AppProviders from "./App/AppProviders";

const container = document.getElementById("root") as Element | DocumentFragment;

const root = createRoot(container);

root.render(
    <StrictMode>
        <AppProviders>
            <App />
        </AppProviders>
    </StrictMode>
);
