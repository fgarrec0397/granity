import { useEffect, useState } from "react";
import { Object3D } from "three";
import serializeVector3 from "../../../Common/utils/serializeVector3";
import uidGenerator from "../../../Common/utils/uidGenerator";
import { useAppDispatch, useAppSelector } from "../../../Core/store";
import { WidgetSceneObject, WidgetProperties, WidgetOptionsValues } from "../../types";
import { setSelected } from "../widgetsReducer";
import useWidgetActions from "./core/useWidgetActions";
import useWidgetsContext from "./core/useWidgetsContext";

export default () => {
    const dispatch = useAppDispatch();
    const { selected, currentWidgetProperties } = useAppSelector((state) => state.widgets);
    const { add, update, updateCurrentProperties } = useWidgetActions();
    const { widgets } = useWidgetsContext();
    const [currentWidgetsState, setCurrentWidgetsState] = useState<WidgetSceneObject[]>([]);

    useEffect(() => {
        // TODO -- Check an optimized version to get the current widgets ---> O(n) instead of O(n^2)
        const currentWidgets = widgets.filter((x) => {
            if (x.id) {
                return selected.indexOf(x.id) !== -1;
            }

            return false;
        });

        setCurrentWidgetsState(currentWidgets);
    }, [selected, widgets]);

    const addWidget = (widget: WidgetSceneObject) => {
        const newWidget = { ...widget };
        newWidget.id = uidGenerator(); // assign id on initialisation

        const defaultProperties: WidgetProperties = {
            position: [0, 0, 0],
            rotation: [0, 0, 0],
            scale: [1, 1, 1],
        };

        const defaultOptions: WidgetOptionsValues | Record<string, never> = {};

        if (newWidget.widgetDefinition.options?.length) {
            for (const option of newWidget.widgetDefinition.options) {
                defaultOptions[option.name] = {
                    fieldType: option.fieldType,
                    value: option.defaultValue,
                };
            }
        }

        add(newWidget, defaultProperties, defaultOptions);
    };

    const getWidgetById = (id: string | undefined) => {
        if (id) {
            return widgets.find((x) => x.id === id);
        }
    };

    // TODO - Wait to refactor the selection in Transformcontrols before refactoring this part.
    const selectWidget = (widget: WidgetSceneObject) => {
        if (widget.id) {
            dispatch(setSelected({ newSelectedId: widget.id }));
        }
    };

    const updateCurrentWidgetOptions = (widgetOptions: WidgetOptionsValues) => {
        const currentWidget = currentWidgetsState[0];

        if (currentWidget?.id) {
            update(currentWidget, undefined, widgetOptions);
        }
    };

    const updateCurrentWidget = (
        widgetProperties: WidgetProperties,
        updateOnlyProperties = false
    ) => {
        const currentWidget = currentWidgetsState[0];

        if (currentWidget?.id) {
            if (updateOnlyProperties) {
                updateCurrentProperties(widgetProperties);
            } else {
                update(currentWidget, widgetProperties);
            }
        }
    };

    const updateCurrentWidgetWithMesh = (
        mesh: Object3D | undefined,
        updateOnlyProperties = false
    ) => {
        if (mesh) {
            updateCurrentWidget(
                {
                    position: serializeVector3(mesh.position),
                    rotation: serializeVector3(mesh.rotation),
                    scale: serializeVector3(mesh.scale),
                },
                updateOnlyProperties
            );
        }
    };

    return {
        currentWidgets: currentWidgetsState,
        firstCurrentWidget: currentWidgetsState[0], // TODO - Remove this
        currentWidgetProperties,
        widgets,
        addWidget,
        getWidgetById,
        selectWidget,
        updateCurrentWidget,
        updateCurrentWidgetWithMesh,
        updateCurrentWidgetOptions,
    };
};
