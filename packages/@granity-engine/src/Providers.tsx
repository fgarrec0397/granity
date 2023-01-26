import { HasChildren, QueryClient, QueryClientProvider } from "@granity/helpers";
import { ThemeProvider, Toaster } from "@granity/ui";
import { useWidgetsModules, WidgetObjectModule, WidgetUIModule } from "@granity-engine/api";
import { store } from "@granity-engine/App/Core/_actions/_data/state/store";
import ProvidersBuilder from "@granity-engine/App/Core/Components/ProvidersBuilder";
import HistoryDictionaryContextProvider from "@granity-engine/App/Editor/_actions/_data/providers/HistoryContextProvider";
import CamerasContextProvider from "@granity-engine/App/Scenes/_actions/_data/providers/CamerasContextProvider";
import WidgetsModulesContextProvider from "@granity-engine/App/Widgets/_actions/_data/providers/WidgetsModulesProvider";
import WidgetsContextProvider from "@granity-engine/App/Widgets/_actions/_data/providers/WidgetsProvider";
import { injectStore } from "@granity-engine/App/Widgets/_actions/utilities/createWidget";
import theme from "@granity-engine/Themes/theme";
import { FC, useEffect } from "react";
import { Provider as ReduxProvider } from "react-redux";

type Props = HasChildren & {
    widgetsModules?: any;
};

injectStore(store);

const queryClient = new QueryClient();

const AppProvider: FC<Props> = ({ widgetsModules, children }) => {
    const Providers = ProvidersBuilder([
        [ThemeProvider, { theme }],
        [ReduxProvider, { store }],
        [QueryClientProvider, { client: queryClient }],
        [CamerasContextProvider],
        [WidgetsContextProvider],
        [WidgetsModulesContextProvider],
        [HistoryDictionaryContextProvider],
    ]);

    return (
        <Providers>
            <Toaster.ToastContainer />
            <SiteWrapper widgetsModules={widgetsModules}>{children}</SiteWrapper>
        </Providers>
    );
};

type SiteWrapperProps = {
    widgetsModules?: any;
    children: React.ReactNode;
};

const SiteWrapper: FC<SiteWrapperProps> = ({ widgetsModules, children }) => {
    const { initWidgetsModules } = useWidgetsModules();

    useEffect(() => {
        const widgetModules: WidgetObjectModule[] | WidgetUIModule[] = [];

        for (const path in widgetsModules) {
            const { widget } = widgetsModules[path] as any;
            widgetModules.push(widget);
        }

        initWidgetsModules(widgetModules);
    }, [initWidgetsModules, widgetsModules]);

    return <>{children}</>;
};

export default AppProvider;
