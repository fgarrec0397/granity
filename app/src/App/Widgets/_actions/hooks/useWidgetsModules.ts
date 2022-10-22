import loadedModules from "@features/Widgets";
import { useCallback } from "react";

import useWidgetsModuleContext from "../_data/hooks/useWidgetsModuleContext";
import { WidgetModule } from "../widgetsTypes";

export default () => {
    const { widgetsModules, setWidgetsModules } = useWidgetsModuleContext();

    const loadWidgetsModules = useCallback(async () => {
        const loadedWidgetsModules = await loadedModules();

        setWidgetsModules(loadedWidgetsModules);

        return loadedWidgetsModules;
    }, [setWidgetsModules]);

    const getWidgetModuleByName = useCallback(
        (widgetName: string, otherWidgetsModules?: WidgetModule[]) => {
            return (otherWidgetsModules || widgetsModules).find(
                (x) => x.widgetDefinition.name === widgetName
            );
        },
        [widgetsModules]
    );

    /**
     * Load the  React component from the widgets modules list of the given widget
     */
    const getWidgetModuleComponentByName = useCallback(
        (widgetName: string, otherWidgetsModules?: WidgetModule[]) => {
            return getWidgetModuleByName(widgetName, otherWidgetsModules)!.component;
        },
        [getWidgetModuleByName]
    );

    return {
        widgetsModules,
        setWidgetsModules,
        loadWidgetsModules,
        getWidgetModuleComponentByName,
        getWidgetModuleByName,
    };
};
