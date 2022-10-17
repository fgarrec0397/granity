import { SerializedWidgetSceneObject, WidgetObjectsDictionaryItem } from "../widgetsTypes";
import useWidgetsModules from "./useWidgetsModules";

export default (widget: WidgetObjectsDictionaryItem | SerializedWidgetSceneObject) => {
    const { widgetsModules } = useWidgetsModules();

    return widgetsModules.find((x) => x.widgetDefinition.name === widget.widgetDefinition.name)
        ?.component;
};
