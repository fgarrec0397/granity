import loadedModules from "@features/Widgets";
import { useCallback } from "react";

import useWidgetsModuleContext from "../_data/hooks/useWidgetsModuleContext";
import filterWidgetsModules from "../utilities/filterWidgetsModules";
import { WidgetObjectModule } from "../widgetsTypes";

export default () => {
    const { widgetsModules, setWidgetsModules, widgetsUIModules, setWidgetsUIModules } =
        useWidgetsModuleContext();

    const loadWidgetsModules = useCallback(async () => {
        const loadedWidgetsModules = await loadedModules();
        const filteredModules = filterWidgetsModules(loadedWidgetsModules);

        if (filteredModules.widgetsModules) {
            setWidgetsModules(filteredModules.widgetsModules);
        }

        if (filteredModules.widgetsUIModules) {
            setWidgetsUIModules(filteredModules.widgetsUIModules);
        }

        return filteredModules;
    }, [setWidgetsModules, setWidgetsUIModules]);

    const getWidgetModuleByName = useCallback(
        (widgetName: string, otherWidgetsModules?: WidgetObjectModule[]) => {
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
        (widgetName: string, otherWidgetsModules?: WidgetObjectModule[]) => {
            return getWidgetModuleByName(widgetName, otherWidgetsModules)!.component;
        },
        [getWidgetModuleByName]
    );

    return {
        widgetsModules,
        widgetsUIModules,
        setWidgetsModules,
        loadWidgetsModules,
        getWidgetModuleComponentByName,
        getWidgetModuleByName,
    };
};
