import { useCallback } from "react";

import useWidgetsModuleContext from "../_data/hooks/useWidgetsModuleContext";
import { SerializedWidgetSceneObject, WidgetObjectsDictionaryItem } from "../widgetsTypes";

export default () => {
    const { widgetsModules, setWidgetsModules } = useWidgetsModuleContext();

    const loadWidgetModule = useCallback(
        (widget: WidgetObjectsDictionaryItem | SerializedWidgetSceneObject) => {
            return widgetsModules.find(
                (x) => x.widgetDefinition.name === widget.widgetDefinition.name
            );
        },
        [widgetsModules]
    );

    /**
     * Load the  React component from the widgets modules list of the given widget
     */
    const getSceneWidgetComponentFromModules = useCallback(
        (widget: WidgetObjectsDictionaryItem | SerializedWidgetSceneObject) => {
            return loadWidgetModule(widget)!.component;
        },
        [loadWidgetModule]
    );

    return {
        widgetsModules,
        setWidgetsModules,
        getSceneWidgetComponentFromModules,
        loadWidgetModule,
    };
};
