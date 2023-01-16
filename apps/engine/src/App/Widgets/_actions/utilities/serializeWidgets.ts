import { serialize } from "@app/Core/_actions/utilities/componentSerializer";
import {
    SerializedWidgetDictionary,
    SerializedWidgetDictionaryItem,
    WidgetDictionary,
    WidgetDictionaryItem,
    WidgetObjectEditorOptions,
} from "@app/Widgets/_actions/widgetsTypes";
import { SetOptionalPropertyFrom } from "@granity/helpers";

export const serializeEditorOptions = ({ meshHolder, helper }: WidgetObjectEditorOptions) => {
    if (meshHolder) {
        const serializedMeshHolder = serialize(meshHolder as JSX.Element);

        return {
            meshHolder: serializedMeshHolder,
            helper,
        };
    }
};

export default (widgets: WidgetDictionary) => {
    const serializedWidgets: SerializedWidgetDictionary = {};

    for (const key in widgets) {
        const widget: SetOptionalPropertyFrom<WidgetDictionaryItem, "component"> = {
            ...widgets[key],
        };

        let editorOptions: WidgetObjectEditorOptions | undefined;

        if ("editorOptions" in widget && widget.editorOptions) {
            editorOptions = serializeEditorOptions(widget.editorOptions);
            widget.editorOptions = editorOptions;
        }

        delete widget.component;

        serializedWidgets[widget.id] = widget as SerializedWidgetDictionaryItem;
    }

    return serializedWidgets;
};
