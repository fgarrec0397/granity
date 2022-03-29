import { useContext } from "react";
import { useAppDispatch, useAppSelector } from "../../../Core/store";
import { IWidget, WidgetSceneObject } from "../../../Core/_Widgets/types";
import { setCurrentWidget } from "../editorReducer";
import { WidgetsContext } from "../WidgetsProvider";

export default () => {
    const dispatch = useAppDispatch();
    const { currentWidget } = useAppSelector((state) => state.editor);
    const { widgets, setWidgets } = useContext(WidgetsContext);

    return {
        currentWidget,
        widgets,
        addWidget: (widget: IWidget) => {
            setWidgets([...widgets, widget]);
        },
        updateCurrentWidget: (widget: WidgetSceneObject) => {
            dispatch(setCurrentWidget(widget));
        },
        removeWidget: (name: string) => {
            const updatedWidgets = widgets.filter(
                ({ widgetDefinition }) => widgetDefinition.name === name
            );
            setWidgets(updatedWidgets);
        },
    };
};
