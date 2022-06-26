import { useCallback } from "react";

import { useWidgetsModuleContext } from "../_data/hooks";
import { SerializedWidgetSceneObject, WidgetSceneObject } from "../widgetsTypes";

export default () => {
    const { widgetsModules, setWidgetsModules } = useWidgetsModuleContext();

    const getComponentFromModules = useCallback(
        (widget: WidgetSceneObject | SerializedWidgetSceneObject) => {
            return widgetsModules.find(
                (x) => x.widgetDefinition.name === widget.widgetDefinition.name
            )?.component;
        },
        [widgetsModules]
    );

    return { widgetsModules, setWidgetsModules, getComponentFromModules };
};
