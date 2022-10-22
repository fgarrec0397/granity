import { SetOptionalPropertyFrom } from "@app/Common/commonTypes";
import { serialize } from "@app/Core/_actions/utilities/componentSerializer";
import {
    SerializedWidgetObjectsDictionary,
    SerializedWidgetObjectDictionaryItem,
    WidgetObjectEditorOptions,
    WidgetObjectsDictionary,
    WidgetObjectsDictionaryItem,
} from "@app/Widgets/_actions/widgetsTypes";

export const serializeWidgets = (widgets: WidgetObjectsDictionary) => {
    const serializedWidgets: SerializedWidgetObjectsDictionary = {};

    for (const key in widgets) {
        const widget: SetOptionalPropertyFrom<WidgetObjectsDictionaryItem, "component"> = {
            ...widgets[key],
        };
        let editorOptions: WidgetObjectEditorOptions | undefined;
        if (widget.editorOptions) {
            editorOptions = serializeEditorOptions(widget.editorOptions);
        }

        widget.editorOptions = editorOptions;

        delete widget.component;

        serializedWidgets[widget.id] = widget as SerializedWidgetObjectDictionaryItem;
    }

    return serializedWidgets;
};

export const serializeEditorOptions = ({ meshHolder, helper }: WidgetObjectEditorOptions) => {
    if (meshHolder) {
        const serializedMeshHolder = serialize(meshHolder as JSX.Element);

        return {
            meshHolder: serializedMeshHolder,
            helper,
        };
    }
};
