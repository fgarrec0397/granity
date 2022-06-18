import { FC } from "react";
import { Provider as ReduxProvider } from "react-redux";
import SceneWidgetsContextProvider from "@widgets/providers/SceneWidgetsProvider";
import { store } from "./Core/store";
import WidgetsModulesContextProvider from "@widgets/providers/WidgetsModulesProvider";
import CamerasContextProvider from "@scene/providers/CamerasContextProvider";

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
