import { HasChildren } from "@granity/helpers";
import { FC, useEffect } from "react";

import { useWidgetsModules, WidgetObjectModule, WidgetUIModule } from "./api";

type Props = HasChildren & {
    widgetsModules: any;
};

const SiteWrapper: FC<Props> = ({ widgetsModules: widgetsModulesProps, children }) => {
    const { initWidgetsModules, widgetsModules } = useWidgetsModules();

    useEffect(() => {
        const loadWidgetsFromModules = () => {
            const widgetModules: WidgetObjectModule[] | WidgetUIModule[] = [];

            for (const path in widgetsModulesProps) {
                const { widget } = widgetsModulesProps[path] as any;
                widgetModules.push(widget);
            }

            return widgetModules;
        };

        const init = () => {
            const asyncModules = loadWidgetsFromModules();

            initWidgetsModules(asyncModules);
        };

        init();
    }, [initWidgetsModules, widgetsModulesProps]);

    useEffect(() => {
        console.log(widgetsModules, "widgetsModules stie wrapper");
    }, [widgetsModules]);

    return <>{children}</>;
};

export default SiteWrapper;
