import useUI from "@engine/App/UI/_actions/hooks/useUI";
import { uidGenerator } from "@granity/helpers";
import { Object3D } from "@granity/three";
import { useSnackbar } from "@granity/ui";
import { useCallback } from "react";

import useWidgetsService from "../_data/hooks/useWidgetsService";
import { UpdateWidgetParameter } from "../_data/widgetsServiceParameters";
import {
    buildWidgetDictionaryProperties,
    buildWidgetInfo,
} from "../utilities/buildWidgetInfoDictionary";
import widgetsConstants from "../widgetsConstants";
import {
    WidgetDictionary,
    WidgetDictionaryItem,
    WidgetInfoBuilder,
    WidgetInfoDictionary,
    WidgetInfoDictionaryItem,
    WidgetOptionsValues,
} from "../widgetsTypes";

const { widgetObjectsPrefix } = widgetsConstants;

export default () => {
    const {
        add,
        addBatch,
        select,
        widgets,
        widgetsIds,
        widgetsInfoDictionary,
        selectedWidgets,
        removeSelection,
        update,
        remove,
        reset,
    } = useWidgetsService();
    const { updateSelectedWidgetProperties } = useUI();
    const { enqueueSnackbar } = useSnackbar();

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
                return widgetsInfoDictionary?.[id];
            }
        },
        [widgetsInfoDictionary]
    );

    const isWidgetExist = useCallback(
        (id: string | undefined) => {
            if (id) {
                return widgets[id] !== undefined;
            }
        },
        [widgets]
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
            const widget = getWidgetById(widgetIdInMesh);

            return { widget, widgetMesh };
        },
        [getWidgetById]
    );

    const updateWidget = useCallback(
        (widgetId: string, value: UpdateWidgetParameter) => {
            update(widgetId, value);

            if (value.properties) {
                updateSelectedWidgetProperties(value.properties);
            }
        },
        [update, updateSelectedWidgetProperties]
    );

    const updateCurrentWidgetOptions = useCallback(
        <TValue = string>(widgetOptions: WidgetOptionsValues<TValue>) => {
            const currentWidget = selectedWidgets[0];

            update(currentWidget.id, { options: widgetOptions });
        },
        [selectedWidgets, update]
    );

    const updatetWidgetWithMesh = useCallback(
        (widgetId: string, mesh: Object3D | undefined, updateOnlyUI?: boolean) => {
            if (mesh) {
                const widgetProperties = buildWidgetDictionaryProperties(mesh);

                if (updateOnlyUI) {
                    updateSelectedWidgetProperties(widgetProperties);
                } else {
                    updateWidget(widgetId, { properties: widgetProperties });
                }
            }
        },
        [updateSelectedWidgetProperties, updateWidget]
    );

    const addWidget = useCallback(
        <WidgetDictionaryItemType extends WidgetDictionaryItem>(
            widget: WidgetDictionaryItemType,
            widgetInfoBuilder?: WidgetInfoBuilder
        ) => {
            const newWidget: WidgetDictionaryItemType = { ...widget };

            newWidget.id = uidGenerator();

            const widgetInfoItem = widgetInfoBuilder
                ? widgetInfoBuilder(newWidget)
                : buildWidgetInfo(newWidget);

            add(newWidget, widgetInfoItem);
        },
        [add]
    );

    const addWidgetsBatch = useCallback(
        (newWidgetsDictionary: WidgetInfoDictionary, newWidgets: WidgetDictionary) => {
            addBatch(newWidgets, newWidgetsDictionary);
        },
        [addBatch]
    );

    const removeWidgetSelection = useCallback(() => {
        removeSelection();
    }, [removeSelection]);

    const selectWidget = useCallback(
        (widgetsToSelect: WidgetDictionaryItem[], forceSelect = false) => {
            if (!forceSelect && widgetsToSelect[0].isFrozen) {
                return;
            }

            const { properties } = widgetsInfoDictionary[widgetsToSelect[0].id];
            select(widgetsToSelect);

            if (properties) {
                updateSelectedWidgetProperties(properties);
                updateWidget(widgetsToSelect[0].id, { properties });
            }
        },
        [widgetsInfoDictionary, select, updateSelectedWidgetProperties, updateWidget]
    );

    const selectWidgetFromMeshArr = useCallback(
        (meshArray: Object3D[]) => {
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
                const properties = widgetsInfoDictionary[widget.id].properties;
                const options = widgetsInfoDictionary[widget.id].options;

                const widgetDictionaryItem = buildWidgetInfo(newWidget, {
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
            enqueueSnackbar("No mesh found", { variant: "error" });
        }
    }, [enqueueSnackbar, removeWidget, selectedWidgets]);

    const resetWidgets = useCallback(
        (
            widgetsToAdd?: WidgetDictionary,
            widgetDictionaryToAdd?: WidgetInfoDictionary,
            shouldRemoveAll?: boolean
        ) => {
            reset(widgetsToAdd || {}, widgetDictionaryToAdd || {}, shouldRemoveAll);
        },
        [reset]
    );

    return {
        selectedWidgets,
        firstCurrentWidget: selectedWidgets[0],
        widgets,
        widgetsIds,
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
        isWidgetExist,
        updateWidget,
        updateCurrentWidgetOptions,
        updatetWidgetWithMesh,
        copyWidget,
        removeselectedWidgets,
        removeWidget,
        removeWidgetSelection,
        resetWidgets,
    };
};
