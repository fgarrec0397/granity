import { useContext, useEffect, useState } from "react";
import uidGenerator from "../../../Common/utils/uidGenerator";
import { useAppDispatch, useAppSelector } from "../../../Core/store";
import { WidgetSceneObject, WidgetProperties } from "../../types";
import { WidgetsContext } from "../WidgetsProvider";
import { setCurrentWidgetProperties, setSelected } from "../widgetsReducer";

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

    const addWidget = (widget: WidgetSceneObject) => {
        const newWidget = { ...widget };
        newWidget.id = uidGenerator(); // assign id on initialisation

        setWidgets([...widgets, newWidget]);
    };

    const getWidgetById = (id: string | undefined) => {
        if (id) {
            return widgets.find((x: any) => x.id === id);
        }
    };

    const selectWidget = (widget: WidgetSceneObject, isMultipleSelect: boolean) => {
        if (widget.id) {
            dispatch(setSelected({ newSelectedId: widget.id, isMultipleSelect }));
        }
    };

    const updateCurrentWidget = (
        widgetProperties: WidgetProperties,
        updateOnlyProperties = false
    ) => {
        if (!updateOnlyProperties) {
            const currentWidget = { ...currentWidgetsState[0] };
            const updateWidgets = widgets.filter((x) => x.id !== currentWidget.id);
            currentWidget.properties = widgetProperties;

            setWidgets([...updateWidgets, currentWidget]);
        }

        dispatch(setCurrentWidgetProperties(widgetProperties));
    };

    return {
        currentWidgets: currentWidgetsState,
        widgets,
        addWidget,
        getWidgetById,
        selectWidget,
        updateCurrentWidget,
    };
};
