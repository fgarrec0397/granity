import { toast } from "@app/Common/components/Html/Toast/ToastContainer";
import { uidGenerator } from "@app/Common/utilities";
import { useCallback } from "react";
import { Object3D } from "three";

import useWidgetsService from "../_data/hooks/useWidgetsService";
import {
    buildWidgetDictionaryProperties,
    buildWidgetInfoDictionaryItem,
} from "../utilities/buildWidgetsInfoDictionary";
import widgetsConstants, { WidgetType } from "../widgetsConstants";
import {
    SerializedWidgetObjectDictionaryItem,
    WidgetDictionary,
    WidgetDictionaryItem,
    WidgetObjectsDictionary,
    WidgetObjectsDictionaryItem,
    WidgetOptionsValues,
    WidgetProperties,
    WidgetsInfoDictionary,
    WidgetsInfoDictionaryItem,
} from "../widgetsTypes";

const { widgetObjectsPrefix } = widgetsConstants;

export default () => {
    const {
        add,
        addBatch,
        select,
        widgets,
        widgetsObjects,
        widgetsUI,
        currentWidgetProperties,
        widgetsInfoDictionary,
        selectedWidgets,
        removeSelection,
        updateV2,
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

    const getWidgetInfoById = useCallback(
        (id: string | undefined) => {
            if (id) {
                return widgetsInfoDictionary[id];
            }
        },
        [widgetsInfoDictionary]
    );

    const displayWidgetName = useCallback(
        (widgetId: string) => {
            const widgetInfo = getWidgetInfoById(widgetId);

            if (widgetInfo?.displayName) {
                return widgetInfo?.displayName;
            }

            return getWidgetById(widgetId)?.name;
        },
        [getWidgetById, getWidgetInfoById]
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

    const updateWidgetV2 = useCallback(
        (widgetId: string, value: Omit<WidgetsInfoDictionaryItem, "id">) => {
            updateV2(widgetId, value);
        },
        [updateV2]
    );

    const updateWidget = useCallback(
        (
            widget: WidgetDictionaryItem,
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

    const updateDisplayedProperties = useCallback(
        (widgetProperties: WidgetProperties) => {
            updateCurrentProperties(widgetProperties);
        },
        [updateCurrentProperties]
    );

    const updateCurrentWidget = useCallback(
        (widgetProperties: WidgetProperties, updateOnlyProperties?: boolean) => {
            const currentWidget = selectedWidgets[0];

            updateWidget(currentWidget, widgetProperties, updateOnlyProperties);
        },
        [selectedWidgets, updateWidget]
    );

    const updateWidgetOptions = useCallback(
        (
            widget: WidgetDictionaryItem | SerializedWidgetObjectDictionaryItem,
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
                const currentWidget = selectedWidgets[0];
                const widgetProperties = buildWidgetDictionaryProperties(mesh);

                if (updateOnlyProperties) {
                    updateCurrentProperties(widgetProperties);
                } else {
                    updateWidgetV2(currentWidget.id, { properties: widgetProperties });
                }
            }
        },
        [selectedWidgets, updateCurrentProperties, updateWidgetV2]
    );

    const addWidget = useCallback(
        (
            widget: WidgetDictionaryItem,
            properties?: WidgetProperties,
            options?: WidgetOptionsValues
        ) => {
            const newWidget: WidgetDictionaryItem = { ...widget };
            let widgetOptions = options;

            newWidget.id = uidGenerator(); // assign id on initialisation

            if (widget.type === WidgetType.GameObject) {
                let widgetProperties = properties;

                if (!widgetProperties) {
                    widgetProperties = {
                        position: [0, 0, 0],
                        rotation: [0, 0, 0],
                        scale: [1, 1, 1],
                    };
                }
            }

            if (!widgetOptions) {
                if (newWidget.options?.length) {
                    const defaultOptions: WidgetOptionsValues = {};
                    for (const option of newWidget.options) {
                        defaultOptions[option.name] = {
                            fieldType: option.fieldType,
                            value: option.defaultValue,
                        };
                    }
                    widgetOptions = defaultOptions;
                }
            }

            const widgetDictionaryItem = buildWidgetInfoDictionaryItem(newWidget);

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

    const copyWidget = useCallback(
        (widget: WidgetObjectsDictionaryItem) => {
            const newWidget = { ...widget };
            const newId = uidGenerator();

            newWidget.id = newId;

            if (widget.id) {
                const properties = widgetsInfoDictionary[widget.id].properties;
                const options = widgetsInfoDictionary[widget.id].options;

                const widgetDictionaryItem = buildWidgetInfoDictionaryItem(newWidget, {
                    properties,
                    options,
                });

                add(newWidget, widgetDictionaryItem);
            }
        },
        [add, widgetsInfoDictionary]
    );

    const removeWidget = useCallback(
        (widgetId: string) => {
            remove(widgetId);
        },
        [remove]
    );

    const removeselectedWidgets = useCallback(() => {
        const widget = selectedWidgets[0];
        if (widget) {
            removeWidget(widget.id);
        } else {
            toast.error("No mesh found");
        }
    }, [removeWidget, selectedWidgets]);

    const removeWidgetSelection = useCallback(() => {
        removeSelection();
    }, [removeSelection]);

    const resetWidgets = useCallback(
        (
            widgetsToAdd?: WidgetDictionary,
            widgetDictionaryToAdd?: WidgetsInfoDictionary,
            shouldRemoveAll?: boolean
        ) => {
            reset(widgetsToAdd || {}, widgetDictionaryToAdd || {}, shouldRemoveAll);
        },
        [reset]
    );

    return {
        selectedWidgets,
        firstCurrentWidget: selectedWidgets[0],
        currentWidgetProperties,
        widgets,
        widgetsObjects,
        widgetsUI,
        widgetsInfoDictionary,
        getWidgetDictionaryFromWidget,

        // Widgets Getters
        getWidgetById,
        getWidgetByMesh,

        // Widgets Actions
        addWidget,
        addWidgetsBatch,
        displayWidgetName,
        selectWidget,
        selectWidgetFromMeshArr,
        updateWidget,
        updateWidgetV2,
        updateWidgetOptions,
        updateCurrentWidgetOptions,
        updateCurrentWidget,
        updateCurrentWidgetWithMesh,
        updateDisplayedProperties,
        copyWidget,
        removeselectedWidgets,
        removeWidget,
        removeWidgetSelection,
        resetWidgets,
    };
};
