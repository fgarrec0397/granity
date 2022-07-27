import { serialize } from "@app/Core/_actions/utilities/componentSerializer";
import { SetOptionalPropertyFrom } from "@common/commonTypes";
import {
    SerializedWidgetSceneObject,
    SerializedWidgetSceneObjects,
    WidgetEditorOptions,
    WidgetSceneObject,
    WidgetSceneObjects,
} from "@widgets/_actions/widgetsTypes";

export const serializeWidgets = (widgets: WidgetSceneObjects) => {
    const serializedWidgets: SerializedWidgetSceneObjects = {};

    for (const key in widgets) {
        const widget: SetOptionalPropertyFrom<WidgetSceneObject, "component"> = { ...widgets[key] };
        let editorOptions: WidgetEditorOptions | undefined;
        // serializedWidgets[key] = widget;
        if (widget.editorOptions) {
            editorOptions = serializeEditorOptions(widget.editorOptions);
        }

        widget.editorOptions = editorOptions;

        delete widget.component;

        serializedWidgets[widget.id] = widget as SerializedWidgetSceneObject;
    }

    return serializedWidgets;
};

export const serializeEditorOptions = ({ meshHolder }: WidgetEditorOptions) => {
    if (meshHolder) {
        const serializedMeshHolder = serialize(meshHolder as JSX.Element);

        return {
            meshHolder: serializedMeshHolder,
        };
    }
};
