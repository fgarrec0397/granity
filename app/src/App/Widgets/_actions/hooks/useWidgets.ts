import { uidGenerator } from "@app/Common/utilities";
import { trigger } from "@app/Core/_actions/utilities/events";
import { useCallback, useEffect, useState } from "react";
import { Object3D } from "three";

import {
    useWidgetDispatch,
    useWidgetsContext,
    useWidgetsSelector,
    useWidgetsServices,
} from "../_data/hooks";
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
    const { currentWidgetProperties, selected, widgetsDictionary } = useWidgetsSelector();
    const { widgets } = useWidgetsContext();
    const [currentWidgetsState, setCurrentWidgetsState] = useState<WidgetSceneObject[]>([]);
    const { add, addBatch, update, remove, updateCurrentProperties } = useWidgetsServices();
    const { dispatchSetSelected, dispatchRemoveSelected } = useWidgetDispatch();

    useEffect(() => {
        // TODO -- Check an optimized version to get the current widgets ---> O(n) instead of O(n^2)
        const currentWidgets = Object.keys(widgets)
            .filter((x) => {
                const widget = widgets[x];

                if (widget.id) {
                    return selected.indexOf(widget.id) !== -1;
                }
                return false;
            })
            .map((x) => widgets[x]);

        setCurrentWidgetsState(currentWidgets);
    }, [selected, widgets]);

    useEffect(() => {
        trigger("updateCurrentWidgetWithMesh", { updateOnlyProperties: true });
    }, [currentWidgetsState]);

    const getWidgetDictionaryFromWidget = (widgetId: string | undefined) => {
        if (widgetId) {
            return widgetsDictionary[widgetId];
        }
    };

    const getWidgetById = (id: string | undefined) => {
        if (id) {
            return widgets[id];
        }
    };

    const getWidgetByMesh = (mesh: Object3D) => {
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
    };

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

    const selectWidget = (widget: WidgetSceneObject) => {
        dispatchSetSelected(widget);
    };

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
            const currentWidget = currentWidgetsState[0];

            updateWidgetOptions(currentWidget, widgetOptions);
        },
        [currentWidgetsState, updateWidgetOptions]
    );

    const updateCurrentWidget = useCallback(
        (widgetProperties: WidgetProperties, updateOnlyProperties?: boolean) => {
            const currentWidget = currentWidgetsState[0];

            updateWidget(currentWidget, widgetProperties, updateOnlyProperties);
        },
        [currentWidgetsState, updateWidget]
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
        const widget = currentWidgetsState[0];
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

    // const removeWidgetsBatch = (meshs: Object3D[]) => {
    //     const { widget } = getWidgetByMesh(mesh);

    //     if (widget.id) {
    //         remove(widget);
    //     }
    // };

    const removeSelected = () => {
        dispatchRemoveSelected();
    };

    return {
        currentWidgets: currentWidgetsState,
        firstCurrentWidget: currentWidgetsState[0],
        currentWidgetProperties,
        widgets,
        widgetsDictionary,
        selected,
        getWidgetDictionaryFromWidget,

        // Widgets Getters
        getWidgetById,
        getWidgetByMesh,

        // Widgets Actions
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
