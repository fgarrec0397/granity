import {
    SerializedWidgetDictionary,
    SerializedWidgetDictionaryItem,
    WidgetDictionary,
    WidgetDictionaryItem,
} from "@granity/engine/App/Widgets/_actions/widgetsTypes";
import { SetOptionalPropertyFrom } from "@granity/helpers";

export default (widgets: WidgetDictionary) => {
    const serializedWidgets: SerializedWidgetDictionary = {};

    for (const key in widgets) {
        const widget: SetOptionalPropertyFrom<WidgetDictionaryItem, "component"> = {
            ...widgets[key],
        };

        delete widget.component;

        serializedWidgets[widget.id] = widget as SerializedWidgetDictionaryItem;
    }

    return serializedWidgets;
};
