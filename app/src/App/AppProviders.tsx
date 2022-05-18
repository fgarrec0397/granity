import React, { FC } from "react";
import { Provider as ReduxProvider } from "react-redux";
import SceneWidgetsContextProvider from "./Widgets/providers/SceneWidgetsProvider";
import { store } from "./Core/store";
import WidgetsContextProvider from "./Widgets/providers/WidgetsProvider";

const AppProviders: FC = ({ children }) => {
    return (
        <ReduxProvider store={store}>
            <SceneWidgetsContextProvider>
                <WidgetsContextProvider>{children}</WidgetsContextProvider>
            </SceneWidgetsContextProvider>
        </ReduxProvider>
    );
};

export default AppProviders;
