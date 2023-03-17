import { store } from "@engine/App/Core/_actions/_data/state/store";
import ProvidersBuilder from "@engine/App/Core/Components/ProvidersBuilder";
import HistoryDictionaryContextProvider from "@engine/App/Editor/_actions/_data/providers/HistoryContextProvider";
import CamerasContextProvider from "@engine/App/Scenes/_actions/_data/providers/CamerasContextProvider";
import WidgetsModulesContextProvider from "@engine/App/Widgets/_actions/_data/providers/WidgetsModulesProvider";
import WidgetsContextProvider from "@engine/App/Widgets/_actions/_data/providers/WidgetsProvider";
import { injectStore } from "@engine/App/Widgets/_actions/utilities/createWidget";
import { HasChildren } from "@granity/helpers";
import { Theme, ThemeProvider } from "@granity/ui";
import { FC } from "react";
import { Provider as ReduxProvider } from "react-redux";

import CoreContextProvider from "./App/Core/_actions/_data/providers/CoreContextProvider";
import { EngineConfig } from "./App/Core/_actions/coreTypes";
import useInitCore from "./App/Core/_actions/hooks/useInitCore";

type Props = HasChildren & {
    config?: EngineConfig;
    theme?: Theme;
};

injectStore(store);

const AppProvider: FC<Props> = ({ config, theme, children }) => {
    const Providers = ProvidersBuilder([
        [ThemeProvider, { theme }],
        [ReduxProvider, { store }],
        [CoreContextProvider],
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
    config?: EngineConfig;
    children: React.ReactNode;
};

// Need this component to init the data within the context
const Initializer: FC<InitializerProps> = ({ config, children }) => {
    console.log(config, "config");

    useInitCore(config);

    return <>{children}</>;
};

export default AppProvider;
