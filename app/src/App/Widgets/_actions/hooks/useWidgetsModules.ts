import { useCallback } from "react";

import { useWidgetsModuleContext } from "../_data/hooks";
import { SerializedWidgetSceneObject, WidgetSceneObject } from "../widgetsTypes";

export default () => {
    const { widgetsModules, setWidgetsModules } = useWidgetsModuleContext();

    const getWidgetModuleFromWidgetScene = useCallback(
        (widget: WidgetSceneObject | SerializedWidgetSceneObject) => {
            return widgetsModules.find(
                (x) => x.widgetDefinition.name === widget.widgetDefinition.name
            );
        },
        [widgetsModules]
    );

    const getSceneWidgetComponentFromModules = useCallback(
        (widget: WidgetSceneObject | SerializedWidgetSceneObject) => {
            return getWidgetModuleFromWidgetScene(widget)!.component;
        },
        [getWidgetModuleFromWidgetScene]
    );

    return {
        widgetsModules,
        setWidgetsModules,
        getSceneWidgetComponentFromModules,
        getWidgetModuleFromWidgetScene,
    };
};
