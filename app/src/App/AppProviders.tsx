import { FC } from "react";
import { Provider as ReduxProvider } from "react-redux";
import SceneWidgetsContextProvider from "./Widgets/providers/SceneWidgetsProvider";
import { store } from "./Core/store";
import WidgetsModulesContextProvider from "./Widgets/providers/WidgetsModulesProvider";

const AppProviders: FC = ({ children }) => {
    return (
        <ReduxProvider store={store}>
            <SceneWidgetsContextProvider>
                <WidgetsModulesContextProvider>{children}</WidgetsModulesContextProvider>
            </SceneWidgetsContextProvider>
        </ReduxProvider>
    );
};

export default AppProviders;
