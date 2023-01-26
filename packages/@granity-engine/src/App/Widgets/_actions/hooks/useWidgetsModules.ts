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

    const initWidgetsModules = useCallback(
        (_widgetsModules: WidgetModules[]) => {
            const filteredModules = filterWidgetsModules(_widgetsModules); // TODO - plug back the loadedWidgetsModules

            if (filteredModules.widgetsObjectModules) {
                setWidgetsModules(filteredModules.widgetsObjectModules);
            }

            if (filteredModules.widgetsUIModules) {
                setWidgetsUIModules(filteredModules.widgetsUIModules);
            }
        },
        [setWidgetsModules, setWidgetsUIModules]
    );

    const getWidgetModuleByName = useCallback(
        (widgetName: string, otherWidgetsModules?: WidgetModules[]) => {
            return (otherWidgetsModules || widgetsModules).find((x) => x.name === widgetName);
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
        initWidgetsModules,
        getWidgetModuleComponentByName,
        getWidgetModuleByName,
    };
};
