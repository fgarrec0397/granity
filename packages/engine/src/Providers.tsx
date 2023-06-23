import { store } from "@engine/App/Core/_actions/_data/state/store";
import HistoryDictionaryContextProvider from "@engine/App/Editor/_actions/_data/providers/HistoryContextProvider";
import CamerasContextProvider from "@engine/App/Scenes/_actions/_data/providers/CamerasContextProvider";
import WidgetsModulesContextProvider from "@engine/App/Widgets/_actions/_data/providers/WidgetsModulesProvider";
import WidgetsContextProvider from "@engine/App/Widgets/_actions/_data/providers/WidgetsProvider";
import { injectStore } from "@engine/App/Widgets/_actions/utilities/createWidget";
import { OnDrop, Provider as DndProvider } from "@granity/draggable";
import { HasChildren, ProvidersBuilder, QueryClient, QueryClientProvider } from "@granity/helpers";
import { Theme, ThemeProvider } from "@granity/ui";
import { FC } from "react";
import { Provider as ReduxProvider } from "react-redux";

import ConfigContextProvider from "./App/Core/_actions/_data/providers/ConfigContextProvider";
import { EngineConfig } from "./App/Core/_actions/coreTypes";
import useInitConfig from "./App/Core/_actions/hooks/useInitConfig";

type Props = HasChildren & {
    config: EngineConfig;
    theme?: Theme;
};

injectStore(store);

const queryClient = new QueryClient();

const onDrop: OnDrop = ({ source, destination, dropType, sameSource }) => {
    const { index: srcIndex, droppableId: srcContainerId } = source;
    const { index: destIndex, droppableId: destContainerId } = destination;

    console.log({ source, destination, dropType, sameSource });

    // your application logic goes here
    // setState(newState)
};

const AppProvider: FC<Props> = ({ config, theme, children }) => {
    const Providers = ProvidersBuilder([
        [ThemeProvider, { theme }],
        [ReduxProvider, { store }],
        [DndProvider, { onDrop }],
        [QueryClientProvider, { client: queryClient }],
        [ConfigContextProvider],
        [CamerasContextProvider],
        [WidgetsContextProvider],
        [WidgetsModulesContextProvider],
        [HistoryDictionaryContextProvider],
    ]);

    return (
        <Providers>
            <Initializer config={config}>{children}</Initializer>
        </Providers>
    );
};

type InitializerProps = {
    config: EngineConfig;
    children: React.ReactNode;
};

// Need this component to init the data within the context
const Initializer: FC<InitializerProps> = ({ config, children }) => {
    useInitConfig(config);

    return <>{children}</>;
};

export default AppProvider;
