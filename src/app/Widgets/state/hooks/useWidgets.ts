import { useContext, useEffect, useState } from "react";
import uidGenerator from "../../../Common/utils/uidGenerator";
import { useAppDispatch, useAppSelector } from "../../../Core/store";
import { IWidget, WidgetSceneObject } from "../../types";
import { setCurrentWidget } from "../../../Editor/state/editorReducer";
import { WidgetsContext } from "../WidgetsProvider";
import { setSelected } from "../widgetsReducer";

export default () => {
    const dispatch = useAppDispatch();
    const { selected } = useAppSelector((state) => state.widgets);
    const { widgets, setWidgets } = useContext(WidgetsContext);
    const [currentWidgetsState, setCurrentWidgetsState] = useState<WidgetSceneObject[]>([]);

    useEffect(() => {
        // TODO -- Check an optimized version to get the currents elements ---> O(n) instead of O(n^2)
        const currentWidgets = widgets.filter((x) => {
            if (x.id) {
                return selected.indexOf(x.id) !== -1;
            }

            return false;
        });

        setCurrentWidgetsState(currentWidgets);
    }, [selected]);

    // Force rerender when widgets is updated. Should at least be for the first widget renderer
    const [, setWidgetsState] = useState<any>([]);
    useEffect(() => {
        setWidgetsState(widgets);
    }, [widgets.length]);

    // TODO - Replace useCurrentObjects with currentWidget and delete currentObjects

    return {
        currentWidgets: currentWidgetsState,
        widgets,
        addWidget: (widget: IWidget) => {
            const newWidget = { ...widget };
            newWidget.id = uidGenerator(); // assign id on initialisation

            setWidgets([...widgets, newWidget]);
        },
        getWidgetById: (id: string | undefined) => {
            if (id) {
                return widgets.find((x: any) => x.id === id);
            }
        },
        selectWidget: (widget: IWidget, isMultipleSelect: boolean) => {
            if (widget.id) {
                dispatch(setSelected({ newSelectedId: widget.id, isMultipleSelect }));
            }
        },
        updateCurrentWidget: (widget: WidgetSceneObject) => {
            dispatch(setCurrentWidget(widget));
        },
        removeCurrentWidget: () => {
            // console.log(currentWidgetsState, "currentWidget");
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
