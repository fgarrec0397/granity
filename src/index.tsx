import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import "antd/dist/antd.css";
import StoreProvider from "./App/StoreProvider";
import EditableProxyProvider from "./App/Scene/_Editor/state/EditableProxyProvider";

ReactDOM.render(
    <React.StrictMode>
        <StoreProvider>
            <EditableProxyProvider>
                <App />
            </EditableProxyProvider>
        </StoreProvider>
    </React.StrictMode>,
    document.getElementById("root")
);
