import { uidGenerator } from "@app/Common/utilities";
import { useCallback } from "react";
import { Object3D } from "three";

import { useWidgetsContext, useWidgetsSelector, useWidgetsServices } from "../_data/hooks";
import {
    buildWidgetDictionaryItem,
    buildWidgetDictionaryProperties,
} from "../utilities/buildWidgetDictionaryItem";
import widgetsConstants from "../widgetsConstants";
import {
    SerializedWidgetSceneObject,
    WidgetObjects,
    WidgetOptionsValues,
    WidgetProperties,
    WidgetSceneObject,
    WidgetsDictionary,
} from "../widgetsTypes";

const { widgetObjectsPrefix } = widgetsConstants;

export default () => {
    const { currentWidgetProperties, widgetsDictionary } = useWidgetsSelector();
    const { widgets, selectedWidgets } = useWidgetsContext();
    const { add, addBatch, select, removeSelection, update, remove, updateCurrentProperties } =
        useWidgetsServices();

    const getWidgetDictionaryFromWidget = (widgetId: string | undefined) => {
        if (widgetId) {
            return widgetsDictionary[widgetId];
        }
    };

    const getWidgetById = useCallback(
        (id: string | undefined) => {
            if (id) {
                return widgets[id];
            }
        },
        [widgets]
    );

    const getWidgetByMesh = useCallback(
        (mesh: Object3D) => {
            let widgetMesh: Object3D | undefined;

            if (mesh.name.startsWith(widgetObjectsPrefix)) {
                widgetMesh = mesh;
            } else {
                mesh.traverseAncestors((object) => {
                    if (object.name.startsWith(widgetObjectsPrefix)) {
                        widgetMesh = object;
                    }
                });
            }

            const widgetIdInMesh = widgetMesh?.name.split("+")[2];
            const widget = getWidgetById(widgetIdInMesh) as WidgetSceneObject;

            return { widget, widgetMesh };
        },
        [getWidgetById]
    );

    const updateWidget = useCallback(
        (
            widget: WidgetSceneObject,
            widgetProperties?: WidgetProperties,
            updateOnlyProperties?: boolean
        ) => {
            if (updateOnlyProperties && widgetProperties) {
                updateCurrentProperties(widgetProperties);
            } else {
                update(widget, widgetProperties);
            }
        },
        [update, updateCurrentProperties]
    );

    const updateCurrentWidget = useCallback(
        (widgetProperties: WidgetProperties, updateOnlyProperties?: boolean) => {
            const currentWidget = selectedWidgets[0];

            updateWidget(currentWidget, widgetProperties, updateOnlyProperties);
        },
        [selectedWidgets, updateWidget]
    );

    const addWidget = (
        widget: WidgetSceneObject,
        properties?: WidgetProperties,
        options?: WidgetOptionsValues
    ) => {
        const newWidget: WidgetSceneObject = { ...widget };
        let widgetProperties = properties;
        let widgetOptions = options;

        newWidget.id = uidGenerator(); // assign id on initialisation

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
        (newWidgetsDictionary: WidgetsDictionary, newWidgets: WidgetObjects) => {
            addBatch(newWidgets, newWidgetsDictionary);
        },
        [addBatch]
    );

    const selectWidget = useCallback(
        (widgetsToSelect: WidgetSceneObject[]) => {
            select(widgetsToSelect);
            updateCurrentWidget(widgetsDictionary[widgetsToSelect[0].id].properties, true);
        },
        [select, widgetsDictionary, updateCurrentWidget]
    );

    const selectWidgetFromMeshArr = useCallback(
        (meshArray: THREE.Object3D[]) => {
            if (meshArray.length) {
                const { widget } = getWidgetByMesh(meshArray[0]);

                if (widget) {
                    selectWidget([widget]);
                }
            }
        },
        [getWidgetByMesh, selectWidget]
    );

    const updateWidgetOptions = useCallback(
        (
            widget: WidgetSceneObject | SerializedWidgetSceneObject,
            widgetOptions: WidgetOptionsValues
        ) => {
            update(widget as WidgetSceneObject, undefined, widgetOptions);
        },
        [update]
    );

    const updateCurrentWidgetOptions = useCallback(
        (widgetOptions: WidgetOptionsValues) => {
            const currentWidget = selectedWidgets[0];

            updateWidgetOptions(currentWidget, widgetOptions);
        },
        [selectedWidgets, updateWidgetOptions]
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

    const removeselectedWidgets = () => {
        const widget = selectedWidgets[0];
        if (widget) {
            removeWidget(widget);
        } else {
            // eslint-disable-next-line no-console
            console.error("No mesh found"); // TODO -- Add UI confirmation
        }
    };

    const removeWidget = (widget: WidgetSceneObject) => {
        if (widget.id) {
            remove(widget);
        }
    };

    const removeWidgetSelection = () => {
        removeSelection();
    };

    return {
        selectedWidgets,
        firstCurrentWidget: selectedWidgets[0],
        currentWidgetProperties,
        widgets,
        widgetsDictionary,
        getWidgetDictionaryFromWidget,

        // Widgets Getters
        getWidgetById,
        getWidgetByMesh,

        // Widgets Actions
        addWidget,
        addWidgetsBatch,
        selectWidget,
        selectWidgetFromMeshArr,
        updateWidget,
        updateWidgetOptions,
        updateCurrentWidgetOptions,
        updateCurrentWidget,
        updateCurrentWidgetWithMesh,
        copyWidget,
        removeselectedWidgets,
        removeWidget,
        removeWidgetSelection,
    };
};
