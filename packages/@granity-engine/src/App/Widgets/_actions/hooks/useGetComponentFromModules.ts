import { SerializedWidgetObjectDictionaryItem, WidgetObjectsDictionaryItem } from "../widgetsTypes";
import useWidgetsModules from "./useWidgetsModules";

export default (widget: WidgetObjectsDictionaryItem | SerializedWidgetObjectDictionaryItem) => {
    const { widgetsModules } = useWidgetsModules();

    return widgetsModules.find((x) => x.name === widget.name)?.component;
};
