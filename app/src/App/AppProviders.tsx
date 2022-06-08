import { FC } from "react";
import { Provider as ReduxProvider } from "react-redux";
import SceneWidgetsContextProvider from "./Widgets/providers/SceneWidgetsProvider";
import { store } from "./Core/store";
import WidgetsModulesContextProvider from "./Widgets/providers/WidgetsModulesProvider";
import CamerasContextProvider from "./Scene/providers/CamerasContextProvider";

const AppProviders: FC = ({ children }) => {
    return (
        <ReduxProvider store={store}>
            <CamerasContextProvider>
                <SceneWidgetsContextProvider>
                    <WidgetsModulesContextProvider>{children}</WidgetsModulesContextProvider>
                </SceneWidgetsContextProvider>
            </CamerasContextProvider>
        </ReduxProvider>
    );
};

export default AppProviders;
