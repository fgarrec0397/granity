import React from "react";
import ReactDOM from "react-dom";
import App from "./App/App";
import "./index.css";
import "antd/dist/antd.css";
import AppProviders from "./App/AppProviders";

ReactDOM.render(
    <React.StrictMode>
        <AppProviders>
            <App />
        </AppProviders>
    </React.StrictMode>,
    document.getElementById("root")
);
