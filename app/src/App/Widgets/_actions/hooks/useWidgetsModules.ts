import loadedModules from "@features/Widgets";
import { useCallback, useMemo } from "react";

import useWidgetsModuleContext from "../_data/hooks/useWidgetsModuleContext";
import filterWidgetsModules from "../utilities/filterWidgetsModules";
import { WidgetModules, WidgetObjectModule } from "../widgetsTypes";

export default () => {
    const { widgetsObjectModules, setWidgetsModules, widgetsUIModules, setWidgetsUIModules } =
        useWidgetsModuleContext();
    const widgetsModules = useMemo(
        () => [...widgetsObjectModules, ...widgetsUIModules],
        [widgetsObjectModules, widgetsUIModules]
    );

    const loadWidgetsModules = useCallback(async () => {
        const loadedWidgetsModules = await loadedModules();
        const filteredModules = filterWidgetsModules(loadedWidgetsModules);

        if (filteredModules.widgetsObjectModules) {
            setWidgetsModules(filteredModules.widgetsObjectModules);
        }

        if (filteredModules.widgetsUIModules) {
            setWidgetsUIModules(filteredModules.widgetsUIModules);
        }

        return loadedWidgetsModules;
    }, [setWidgetsModules, setWidgetsUIModules]);

    const getWidgetModuleByName = useCallback(
        (widgetName: string, otherWidgetsModules?: WidgetModules[]) => {
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
        widgetsObjectModules,
        widgetsUIModules,
        setWidgetsModules,
        loadWidgetsModules,
        getWidgetModuleComponentByName,
        getWidgetModuleByName,
    };
};
