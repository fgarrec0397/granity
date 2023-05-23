import { SerializedWidgetDictionaryItem, WidgetDictionaryItem } from "../widgetsTypes";
import useWidgetsModules from "./useWidgetsModules";

export default (widget: WidgetDictionaryItem | SerializedWidgetDictionaryItem) => {
    const { widgetsModules } = useWidgetsModules();

    return widgetsModules.find((x) => x.name === widget.name)?.component;
};
