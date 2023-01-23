import { QueryClient, QueryClientProvider } from "@granity/helpers";
import { store } from "@granity-engine/App/Core/_actions/_data/state/store";
import HistoryDictionaryContextProvider from "@granity-engine/App/Editor/_actions/_data/providers/HistoryContextProvider";
import CamerasContextProvider from "@granity-engine/App/Scenes/_actions/_data/providers/CamerasContextProvider";
import WidgetsModulesContextProvider from "@granity-engine/App/Widgets/_actions/_data/providers/WidgetsModulesProvider";
import WidgetsContextProvider from "@granity-engine/App/Widgets/_actions/_data/providers/WidgetsProvider";
import { injectStore } from "@granity-engine/App/Widgets/_actions/utilities/createWidget";
import { FC } from "react";
import { Provider as ReduxProvider } from "react-redux";

type Props = {
    children: React.ReactNode;
};

injectStore(store);

const queryClient = new QueryClient();

const AppProvider: FC<Props> = ({ children }) => {
    return (
        <ReduxProvider store={store}>
            <QueryClientProvider client={queryClient}>
                <CamerasContextProvider>
                    <WidgetsContextProvider>
                        <WidgetsModulesContextProvider>
                            <HistoryDictionaryContextProvider>
                                {children}
                            </HistoryDictionaryContextProvider>
                        </WidgetsModulesContextProvider>
                    </WidgetsContextProvider>
                </CamerasContextProvider>
            </QueryClientProvider>
        </ReduxProvider>
    );
};

export default AppProvider;
