import {
    SerializedWidgetDictionary,
    SerializedWidgetDictionaryItem,
    WidgetDictionary,
    WidgetDictionaryItem,
} from "@engine/App/Widgets/_actions/widgetsTypes";
import { SetOptionalPropertyFrom } from "@granity/helpers";

export default (widgets: WidgetDictionary) => {
    const serializedWidgets: SerializedWidgetDictionary = {};

    for (const key in widgets) {
        const widget: SetOptionalPropertyFrom<WidgetDictionaryItem, "component"> = {
            ...widgets[key],
        };

        delete widget.component;

        if ("editorOptions" in widget) {
            delete widget.editorOptions;
        }

        if ("reducer" in widget) {
            delete widget.reducer;
        }

        serializedWidgets[widget.id] = widget as SerializedWidgetDictionaryItem;
    }

    return serializedWidgets;
};
