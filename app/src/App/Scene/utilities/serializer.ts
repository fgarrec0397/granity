import { SetOptionalPropertyFrom } from "@common/commonTypes";
import { WidgetEditorOptions, WidgetSceneObject } from "@widgets/widgetsTypes";
import { serialize } from "@core/utilities/componentSerializer";

export const serializeWidgets = (
    widgets: SetOptionalPropertyFrom<WidgetSceneObject, "component">[]
) => {
    return widgets.map((x) => {
        const clonedWidget = { ...x };

        if (x.editorOptions) {
            x.editorOptions = serializeEditorOptions(x.editorOptions);
        }

        delete clonedWidget.component;

        return clonedWidget;
    });
};

export const serializeEditorOptions = ({ meshHolder }: WidgetEditorOptions) => {
    if (meshHolder) {
        const serializedMeshHolder = serialize(meshHolder as JSX.Element);

        return {
            meshHolder: serializedMeshHolder,
        };
    }
};
