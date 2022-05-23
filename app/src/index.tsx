import { render } from "react-dom";
import App from "./App/App";
import "./index.css";
import "antd/dist/antd.css";
import AppProviders from "./App/AppProviders";
import { StrictMode } from "react";

render(
    <StrictMode>
        <AppProviders>
            <App />
        </AppProviders>
    </StrictMode>,
    document.getElementById("root")
);
