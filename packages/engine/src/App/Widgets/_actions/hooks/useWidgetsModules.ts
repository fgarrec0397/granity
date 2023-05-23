import { useCallback } from "react";

import useWidgetsModuleContext from "../_data/hooks/useWidgetsModuleContext";
import { WidgetModules } from "../widgetsTypes";

export default () => {
    const { widgetsModules, setWidgetsModules } = useWidgetsModuleContext();

    const initWidgetsModules = useCallback(
        (_widgetsModules: WidgetModules[]) => {
            setWidgetsModules(_widgetsModules);
        },
        [setWidgetsModules]
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
        (widgetName: string, otherWidgetsModules?: WidgetModules[]) => {
            return getWidgetModuleByName(widgetName, otherWidgetsModules)!.component;
        },
        [getWidgetModuleByName]
    );

    return {
        widgetsModules,
        setWidgetsModules,
        initWidgetsModules,
        getWidgetModuleComponentByName,
        getWidgetModuleByName,
    };
};
