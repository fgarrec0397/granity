import WidgetsContextProvider from "@app/Widgets/_actions/_data/providers/WidgetsProvider";
import { store } from "@core/store";
import CamerasContextProvider from "@scene/_actions/_data/providers/CamerasContextProvider";
import WidgetsModulesContextProvider from "@widgets/_actions/_data/providers/WidgetsModulesProvider";
import { FC } from "react";
import { Provider as ReduxProvider } from "react-redux";

const AppProviders: FC = ({ children }) => {
    return (
        <ReduxProvider store={store}>
            <CamerasContextProvider>
                <WidgetsContextProvider>
                    <WidgetsModulesContextProvider>{children}</WidgetsModulesContextProvider>
                </WidgetsContextProvider>
            </CamerasContextProvider>
        </ReduxProvider>
    );
};

export default AppProviders;
