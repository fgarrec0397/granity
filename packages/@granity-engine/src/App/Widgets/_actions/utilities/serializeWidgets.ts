import { SetOptionalPropertyFrom } from "@granity/helpers";
import { serialize } from "@granity-engine/App/Core/_actions/utilities/componentSerializer";
import {
    SerializedWidgetDictionary,
    SerializedWidgetDictionaryItem,
    WidgetDictionary,
    WidgetDictionaryItem,
    WidgetObjectEditorOptions,
} from "@granity-engine/App/Widgets/_actions/widgetsTypes";

export const serializeEditorOptions = ({ gizmo, helper }: WidgetObjectEditorOptions) => {
    if (gizmo) {
        const serializedMeshHolder = serialize(gizmo as JSX.Element);

        return {
            gizmo: serializedMeshHolder,
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
