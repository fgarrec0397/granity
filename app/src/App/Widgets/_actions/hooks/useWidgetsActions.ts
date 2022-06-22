import { Object3D } from "three";
import { serializeVector3, uidGenerator } from "@common/utilities";
import {
    WidgetOptionsValues,
    WidgetProperties,
    WidgetSceneObject,
    WidgetsDictionary,
} from "../widgetsTypes";
import { useWidgetsServices, useWidgetDispatch, useWidgetsSelector } from "../_data/hooks";
import useGetWidgets from "./useGetWidgets";
import useWidgets from "./useWidgets";
import { useCallback } from "react";

export default () => {
    const { currentWidgets } = useWidgets();
    const { add, addBatch, update, remove, updateCurrentProperties } = useWidgetsServices();
    const { widgetsDictionary } = useWidgetsSelector();
    const { dispatchSetSelected, dispatchRemoveSelected } = useWidgetDispatch();
    const { getMeshByWidget, getWidgetByMesh } = useGetWidgets();

    const addWidget = (
        widget: WidgetSceneObject,
        properties?: WidgetProperties,
        options?: WidgetOptionsValues
    ) => {
        const newWidget = { ...widget };
        let widgetProperties = properties;
        let widgetOptions = options;

        if (!newWidget.id) {
            newWidget.id = uidGenerator(); // assign id on initialisation
        }

        if (!widgetProperties) {
            widgetProperties = {
                position: [0, 0, 0],
                rotation: [0, 0, 0],
                scale: [1, 1, 1],
            };
        }

        if (!widgetOptions) {
            if (newWidget.widgetDefinition.options?.length) {
                const defaultOptions: WidgetOptionsValues = {};
                for (const option of newWidget.widgetDefinition.options) {
                    defaultOptions[option.name] = {
                        fieldType: option.fieldType,
                        value: option.defaultValue,
                    };
                }
                widgetOptions = defaultOptions;
            }
        }

        add(newWidget, widgetProperties, widgetOptions as WidgetOptionsValues);
    };

    const addWidgetsBatch = useCallback(
        (newWidgetsDictionary: WidgetsDictionary, newWidgets: WidgetSceneObject[]) => {
            addBatch(newWidgetsDictionary, newWidgets);
        },
        [addBatch]
    );

    const selectWidget = (widget: WidgetSceneObject) => {
        if (widget.id) {
            // TODO -- Fix this bug (it gives the wrong properties to the next selected widget)
            // const widgetProperties = widgetsDictionary[widget.id].properties;
            // updateCurrentWidget(widgetProperties);
            dispatchSetSelected(widget);
        }
    };

    const updateCurrentWidgetOptions = (widgetOptions: WidgetOptionsValues) => {
        const currentWidget = currentWidgets[0];

        if (currentWidget?.id) {
            update(currentWidget, undefined, widgetOptions);
        }
    };

    const updateCurrentWidget = (
        widgetProperties: WidgetProperties,
        updateOnlyProperties = false
    ) => {
        const currentWidget = currentWidgets[0];

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

    const copyWidget = (widget: WidgetSceneObject) => {
        const newWidget = { ...widget };
        const newId = uidGenerator();

        newWidget.id = newId;

        if (widget.id) {
            add(
                newWidget,
                widgetsDictionary[widget.id].properties,
                widgetsDictionary[widget.id].options
            );
        }
    };

    const removeCurrentWidgets = () => {
        const mesh = getMeshByWidget(currentWidgets[0]);

        if (mesh) {
            removeWidget(mesh);
        } else {
            // eslint-disable-next-line no-console
            console.error("No mesh found"); // TODO -- Add UI confirmation
        }
    };

    const removeWidget = (mesh: Object3D) => {
        const { widget } = getWidgetByMesh(mesh);

        if (widget.id) {
            remove(widget);
        }
    };

    const removeSelected = () => {
        dispatchRemoveSelected();
    };

    return {
        addWidget,
        addWidgetsBatch,
        selectWidget,
        updateCurrentWidget,
        updateCurrentWidgetWithMesh,
        updateCurrentWidgetOptions,
        copyWidget,
        removeCurrentWidgets,
        removeWidget,
        removeSelected,
    };
};
