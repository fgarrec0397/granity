import { ProvidersBuilder } from "@granity/helpers";
import { HasChildren } from "@granity/helpers/src/types/react";
import { Theme, ThemeProvider } from "@granity/ui/src/Theme";
import { store } from "@granity-engine/App/Core/_actions/_data/state/store";
import HistoryDictionaryContextProvider from "@granity-engine/App/Editor/_actions/_data/providers/HistoryContextProvider";
import CamerasContextProvider from "@granity-engine/App/Scenes/_actions/_data/providers/CamerasContextProvider";
import WidgetsModulesContextProvider from "@granity-engine/App/Widgets/_actions/_data/providers/WidgetsModulesProvider";
import WidgetsContextProvider from "@granity-engine/App/Widgets/_actions/_data/providers/WidgetsProvider";
import { injectStore } from "@granity-engine/App/Widgets/_actions/utilities/createWidget";
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
    useInitCore(config);

    return <>{children}</>;
};

export default AppProvider;
