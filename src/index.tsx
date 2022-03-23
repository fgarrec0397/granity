import React from "react";
import ReactDOM from "react-dom";
import App from "./App/App";
import "./index.css";
import "antd/dist/antd.css";
import StoreProvider from "./App/Core/StoreProvider";
import EditableProxyProvider from "./App/Editor/state/EditableProxyProvider";
import WidgetsContextProvider from "./App/Editor/state/WidgetsProvider";

ReactDOM.render(
    <React.StrictMode>
        <StoreProvider>
            <EditableProxyProvider>
                <WidgetsContextProvider>
                    <App />
                </WidgetsContextProvider>
            </EditableProxyProvider>
        </StoreProvider>
    </React.StrictMode>,
    document.getElementById("root")
);
