import { uidGenerator } from "helpers-granity";
import { useCallback } from "react";
import { Object3D } from "three";
import { Toaster } from "ui-granity";

import useWidgetsService from "../_data/hooks/useWidgetsService";
import {
    buildWidgetDictionaryProperties,
    buildWidgetObjectInfo,
} from "../utilities/buildWidgetObjectInfoDictionary";
import widgetsConstants, { WidgetType } from "../widgetsConstants";
import {
    WidgetDictionary,
    WidgetDictionaryItem,
    WidgetObjectInfo,
    WidgetObjectInfoDictionary,
    WidgetObjectsDictionary,
    WidgetObjectsDictionaryItem,
    WidgetOptionsValues,
    WidgetProperties,
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
        widgetsObjectInfoDictionary,
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
                return widgetsObjectInfoDictionary[widgetId];
            }
        },
        [widgetsObjectInfoDictionary]
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
                return widgetsObjectInfoDictionary[id];
            }
        },
        [widgetsObjectInfoDictionary]
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

    const updateWidget = useCallback(
        (widgetId: string, value: Omit<WidgetObjectInfo, "id">) => {
            update(widgetId, value);
        },
        [update]
    );

    const updateDisplayedProperties = useCallback(
        (widgetProperties: WidgetProperties) => {
            updateCurrentProperties(widgetProperties);
        },
        [updateCurrentProperties]
    );

    const updateCurrentWidgetOptions = useCallback(
        (widgetOptions: WidgetOptionsValues) => {
            const currentWidget = selectedWidgets[0];

            update(currentWidget.id, { options: widgetOptions });
        },
        [selectedWidgets, update]
    );

    const updateCurrentWidgetWithMesh = useCallback(
        (mesh: Object3D | undefined, updateOnlyProperties?: boolean) => {
            if (mesh) {
                const currentWidget = selectedWidgets[0];
                const widgetProperties = buildWidgetDictionaryProperties(mesh);

                if (updateOnlyProperties) {
                    updateCurrentProperties(widgetProperties);
                } else {
                    updateWidget(currentWidget.id, { properties: widgetProperties });
                }
            }
        },
        [selectedWidgets, updateCurrentProperties, updateWidget]
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

            const widgetDictionaryItem = buildWidgetObjectInfo(newWidget);

            add(newWidget, widgetDictionaryItem);
        },
        [add]
    );

    const addWidgetsBatch = useCallback(
        (newWidgetsDictionary: WidgetObjectInfoDictionary, newWidgets: WidgetObjectsDictionary) => {
            addBatch(newWidgets, newWidgetsDictionary);
        },
        [addBatch]
    );

    const selectWidget = useCallback(
        (widgetsToSelect: WidgetObjectsDictionaryItem[]) => {
            const { properties } = widgetsObjectInfoDictionary[widgetsToSelect[0].id];
            select(widgetsToSelect);

            if (properties) {
                updateCurrentProperties(properties);
                updateWidget(widgetsToSelect[0].id, { properties });
            }
        },
        [widgetsObjectInfoDictionary, select, updateCurrentProperties, updateWidget]
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
        (widget: WidgetDictionaryItem) => {
            const newWidget = { ...widget };
            const newId = uidGenerator();

            newWidget.id = newId;

            if (widget.id) {
                const properties = widgetsObjectInfoDictionary[widget.id].properties;
                const options = widgetsObjectInfoDictionary[widget.id].options;

                const widgetDictionaryItem = buildWidgetObjectInfo(newWidget, {
                    properties,
                    options,
                });

                add(newWidget, widgetDictionaryItem);
            }
        },
        [add, widgetsObjectInfoDictionary]
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
            Toaster.toast.error("No mesh found");
        }
    }, [removeWidget, selectedWidgets]);

    const removeWidgetSelection = useCallback(() => {
        removeSelection();
    }, [removeSelection]);

    const resetWidgets = useCallback(
        (
            widgetsToAdd?: WidgetDictionary,
            widgetDictionaryToAdd?: WidgetObjectInfoDictionary,
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
        widgetsObjectInfoDictionary,
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
        updateCurrentWidgetOptions,
        updateCurrentWidgetWithMesh,
        updateDisplayedProperties,
        copyWidget,
        removeselectedWidgets,
        removeWidget,
        removeWidgetSelection,
        resetWidgets,
    };
};
