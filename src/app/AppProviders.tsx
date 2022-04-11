import React, { FC } from "react";
import { Provider as ReduxProvider } from "react-redux";
import WidgetsContextProvider from "./Widgets/state/WidgetsProvider";
import { store } from "./Core/store";

const AppProviders: FC = ({ children }) => {
    return (
        <ReduxProvider store={store}>
            <WidgetsContextProvider>{children}</WidgetsContextProvider>
        </ReduxProvider>
    );
};

export default AppProviders;
