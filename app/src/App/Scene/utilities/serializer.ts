import { SetOptionalPropertyFrom } from "../../Common/utils/typings";
import { WidgetEditorOptions, WidgetSceneObject } from "../../Widgets/types";
import { serializeComponent } from "../../Core/utils/componentSerializer";

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
    const serializedMeshHolder = serializeComponent(meshHolder);

    return {
        meshHolder: serializedMeshHolder,
    };
};
