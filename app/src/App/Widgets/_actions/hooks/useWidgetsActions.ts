import { uidGenerator } from "@common/utilities";
import { useCallback } from "react";
import { Object3D } from "three";

import { useWidgetDispatch, useWidgetsSelector, useWidgetsServices } from "../_data/hooks";
import {
    buildWidgetDictionaryItem,
    buildWidgetDictionaryProperties,
} from "../utilities/buildWidgetDictionaryItem";
import {
    SerializedWidgetSceneObject,
    WidgetOptionsValues,
    WidgetProperties,
    WidgetSceneObject,
    WidgetsDictionary,
} from "../widgetsTypes";
import useGetWidgets from "./useGetWidgets";
import useWidgets from "./useWidgets";

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

        const widgetDictionaryItem = buildWidgetDictionaryItem(newWidget);

        add(newWidget, widgetDictionaryItem);
    };

    const addWidgetsBatch = useCallback(
        (newWidgetsDictionary: WidgetsDictionary, newWidgets: WidgetSceneObject[]) => {
            addBatch(newWidgets, newWidgetsDictionary);
        },
        [addBatch]
    );

    const selectWidget = (widget: WidgetSceneObject) => {
        if (widget.id) {
            dispatchSetSelected(widget);
        }
    };

    const updateWidget = useCallback(
        (
            widget: WidgetSceneObject,
            widgetProperties?: WidgetProperties,
            updateOnlyProperties?: boolean
        ) => {
            if (widget?.id) {
                if (updateOnlyProperties && widgetProperties) {
                    updateCurrentProperties(widgetProperties);
                } else {
                    update(widget, widgetProperties);
                }
            }
        },
        [update, updateCurrentProperties]
    );

    const updateWidgetOptions = useCallback(
        (
            widget: WidgetSceneObject | SerializedWidgetSceneObject,
            widgetOptions: WidgetOptionsValues
        ) => {
            if (widget?.id) {
                update(widget as WidgetSceneObject, undefined, widgetOptions);
            }
        },
        [update]
    );

    const updateCurrentWidgetOptions = useCallback(
        (widgetOptions: WidgetOptionsValues) => {
            const currentWidget = currentWidgets[0];

            if (currentWidget?.id) {
                updateWidgetOptions(currentWidget, widgetOptions);
            }
        },
        [currentWidgets, updateWidgetOptions]
    );

    const updateCurrentWidget = useCallback(
        (widgetProperties: WidgetProperties, updateOnlyProperties?: boolean) => {
            const currentWidget = currentWidgets[0];

            if (currentWidget?.id) {
                updateWidget(currentWidget, widgetProperties, updateOnlyProperties);
            }
        },
        [currentWidgets, updateWidget]
    );

    const updateCurrentWidgetWithMesh = useCallback(
        (mesh: Object3D | undefined, updateOnlyProperties?: boolean) => {
            if (mesh) {
                const widgetProperties = buildWidgetDictionaryProperties(mesh);

                updateCurrentWidget(widgetProperties, updateOnlyProperties);
            }
        },
        [updateCurrentWidget]
    );

    const copyWidget = (widget: WidgetSceneObject) => {
        const newWidget = { ...widget };
        const newId = uidGenerator();

        newWidget.id = newId;

        if (widget.id) {
            const properties = widgetsDictionary[widget.id].properties;
            const options = widgetsDictionary[widget.id].options;

            const widgetDictionaryItem = buildWidgetDictionaryItem(newWidget, {
                properties,
                options,
            });

            add(newWidget, widgetDictionaryItem);
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
        updateWidget,
        updateWidgetOptions,
        updateCurrentWidgetOptions,
        updateCurrentWidget,
        updateCurrentWidgetWithMesh,
        copyWidget,
        removeCurrentWidgets,
        removeWidget,
        removeSelected,
    };
};
