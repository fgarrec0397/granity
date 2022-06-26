import { SerializedWidgetSceneObject, WidgetSceneObject } from "../widgetsTypes";
import useWidgetsModules from "./useWidgetsModules";

export default (widget: WidgetSceneObject | SerializedWidgetSceneObject) => {
    const { widgetsModules } = useWidgetsModules();

    return widgetsModules.find((x) => x.widgetDefinition.name === widget.widgetDefinition.name)
        ?.component;
};
