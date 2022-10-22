import { uidGenerator } from "@app/Common/utilities";
import { useCallback } from "react";
import { Object3D } from "three";

import useWidgetsService from "../_data/hooks/useWidgetsService";
import {
    buildWidgetDictionaryItem,
    buildWidgetDictionaryProperties,
} from "../utilities/buildWidgetDictionaryItem";
import widgetsConstants from "../widgetsConstants";
import {
    SerializedWidgetObjectDictionaryItem,
    WidgetObjectsDictionary,
    WidgetObjectsDictionaryItem,
    WidgetOptionsValues,
    WidgetProperties,
    WidgetsInfoDictionary,
} from "../widgetsTypes";

const { widgetObjectsPrefix } = widgetsConstants;

export default () => {
    const {
        add,
        addBatch,
        select,
        widgets,
        currentWidgetProperties,
        widgetsInfoDictionary,
        selectedWidgets,
        removeSelection,
        update,
        remove,
        updateCurrentProperties,
        reset,
    } = useWidgetsService();

    const getWidgetDictionaryFromWidget = useCallback(
        (widgetId: string | undefined) => {
            if (widgetId) {
                return widgetsInfoDictionary[widgetId];
            }
        },
        [widgetsInfoDictionary]
    );

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
            const widget = getWidgetById(widgetIdInMesh) as WidgetObjectsDictionaryItem;

            return { widget, widgetMesh };
        },
        [getWidgetById]
    );

    const updateWidget = useCallback(
        (
            widget: WidgetObjectsDictionaryItem,
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

    const addWidget = useCallback(
        (
            widget: WidgetObjectsDictionaryItem,
            properties?: WidgetProperties,
            options?: WidgetOptionsValues
        ) => {
            const newWidget: WidgetObjectsDictionaryItem = { ...widget };
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
        },
        [add]
    );

    const addWidgetsBatch = useCallback(
        (newWidgetsDictionary: WidgetsInfoDictionary, newWidgets: WidgetObjectsDictionary) => {
            addBatch(newWidgets, newWidgetsDictionary);
        },
        [addBatch]
    );

    const selectWidget = useCallback(
        (widgetsToSelect: WidgetObjectsDictionaryItem[]) => {
            const { properties } = widgetsInfoDictionary[widgetsToSelect[0].id];
            select(widgetsToSelect);

            if (properties) {
                updateCurrentWidget(properties, true);
            }
        },
        [select, widgetsInfoDictionary, updateCurrentWidget]
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
            widget: WidgetObjectsDictionaryItem | SerializedWidgetObjectDictionaryItem,
            widgetOptions: WidgetOptionsValues
        ) => {
            update(widget as WidgetObjectsDictionaryItem, undefined, widgetOptions);
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

    const copyWidget = useCallback(
        (widget: WidgetObjectsDictionaryItem) => {
            const newWidget = { ...widget };
            const newId = uidGenerator();

            newWidget.id = newId;

            if (widget.id) {
                const properties = widgetsInfoDictionary[widget.id].properties;
                const options = widgetsInfoDictionary[widget.id].options;

                const widgetDictionaryItem = buildWidgetDictionaryItem(newWidget, {
                    properties,
                    options,
                });

                add(newWidget, widgetDictionaryItem);
            }
        },
        [add, widgetsInfoDictionary]
    );

    const removeWidget = useCallback(
        (widget: WidgetObjectsDictionaryItem) => {
            if (widget.id) {
                remove(widget);
            }
        },
        [remove]
    );

    const removeselectedWidgets = useCallback(() => {
        const widget = selectedWidgets[0];
        if (widget) {
            removeWidget(widget);
        } else {
            // eslint-disable-next-line no-console
            console.error("No mesh found"); // TODO -- Add UI confirmation
        }
    }, [removeWidget, selectedWidgets]);

    const removeWidgetSelection = useCallback(() => {
        removeSelection();
    }, [removeSelection]);

    const resetWidgets = useCallback(
        (
            widgetsToAdd: WidgetObjectsDictionary,
            widgetDictionaryToAdd: WidgetsInfoDictionary,
            shouldRemoveAll?: boolean
        ) => {
            reset(widgetsToAdd, widgetDictionaryToAdd, shouldRemoveAll);
        },
        [reset]
    );

    return {
        selectedWidgets,
        firstCurrentWidget: selectedWidgets[0],
        currentWidgetProperties,
        widgets,
        widgetsInfoDictionary,
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
        resetWidgets,
    };
};
