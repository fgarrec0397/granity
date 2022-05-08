import React from "react";
import { render } from "react-dom";
import App from "./App/App";
import "./index.css";
import "antd/dist/antd.css";
import AppProviders from "./App/AppProviders";

render(
    <React.StrictMode>
        <AppProviders>
            <App />
        </AppProviders>
    </React.StrictMode>,
    document.getElementById("root")
);
