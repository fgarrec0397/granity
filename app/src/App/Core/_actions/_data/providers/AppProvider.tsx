import { store } from "@app/Core/store";
import CamerasContextProvider from "@app/Scenes/_actions/_data/providers/CamerasContextProvider";
import WidgetsModulesContextProvider from "@app/Widgets/_actions/_data/providers/WidgetsModulesProvider";
import WidgetsContextProvider from "@app/Widgets/_actions/_data/providers/WidgetsProvider";
import { FC } from "react";
import { Provider as ReduxProvider } from "react-redux";

import HistoryDictionaryContextProvider from "../../../../Editor/_actions/_data/providers/HistoryContextProvider";

type Props = {
    children: React.ReactNode;
};

const AppProvider: FC<Props> = ({ children }) => {
    return (
        <ReduxProvider store={store}>
            <CamerasContextProvider>
                <WidgetsContextProvider>
                    <WidgetsModulesContextProvider>
                        <HistoryDictionaryContextProvider>
                            {children}
                        </HistoryDictionaryContextProvider>
                    </WidgetsModulesContextProvider>
                </WidgetsContextProvider>
            </CamerasContextProvider>
        </ReduxProvider>
    );
};

export default AppProvider;
