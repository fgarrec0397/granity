import { useContext, useEffect, useState } from "react";
import { Object3D } from "three";
import uidGenerator from "../../../Common/utils/uidGenerator";
import { useAppDispatch, useAppSelector } from "../../../Core/store";
import { IWidget, WidgetSceneObject } from "../../../Core/_Widgets/types";
import { setCurrentWidget } from "../editorReducer";
import { WidgetsContext } from "../WidgetsProvider";

export default () => {
    const dispatch = useAppDispatch();
    const { currentWidget } = useAppSelector((state) => state.editor);
    const { widgets, setWidgets } = useContext(WidgetsContext);
    // console.log(widgets, "widgets root");
    const [widgetsState, setWidgetsState] = useState<IWidget[]>([]);

    useEffect(() => {
        setWidgetsState(widgets);
    }, [widgets]);

    return {
        currentWidget,
        widgets: widgetsState,
        addWidget: (widget: IWidget) => {
            widget.id = uidGenerator(); // assign id on initialisation
            setWidgets([...widgets, widget]);
        },
        getWidgetById: (id: string | undefined) => {
            console.log(widgetsState, "widgetsState"); // TODO - Make sure we have widgets here
            if (id) {
                return widgetsState.find((x) => x.id === id);
            }
        },
        selectCurrentWidget: (widget: WidgetSceneObject) => {
            dispatch(setCurrentWidget(widget));
        },
        updateCurrentWidget: (widget: WidgetSceneObject) => {
            dispatch(setCurrentWidget(widget));
        },
        removeCurrentWidget: () => {
            console.log(currentWidget, "currentWidget");

            // const updatedWidgets = widgets.filter(
            //     ({ widgetDefinition }) => widgetDefinition.name === name
            // );
            // setWidgets(updatedWidgets);
        },
        removeWidget: (name: string) => {
            const updatedWidgets = widgets.filter(
                ({ widgetDefinition }) => widgetDefinition.name === name
            );
            setWidgets(updatedWidgets);
        },
    };
};
