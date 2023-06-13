import { useWidgets, useWidgetsModules, WidgetsIds, WidgetType } from "@engine/api";
import useUI from "@engine/App/UI/_actions/hooks/useUI";
import selectedWidgetsFilter from "@engine/App/Widgets/_actions/filters/selectedWidgetsFilter";
import widgetsFilter from "@engine/App/Widgets/_actions/filters/widgetsFilter";
import widgetsIdsFilter from "@engine/App/Widgets/_actions/filters/widgetsIdsFilter";
import widgetsInfoFilter from "@engine/App/Widgets/_actions/filters/widgetsInfoFilter";
import widgetsModulesFilter from "@engine/App/Widgets/_actions/filters/widgetsModulesFilter";
import { Object3D } from "@granity/three";
import { useCallback, useMemo } from "react";

import { gameWidgetPrefix } from "../gameConstants";
import {
    GameWidgetDictionary,
    GameWidgetDictionaryItem,
    GameWidgetInfoDictionary,
    GameWidgetModule,
    GameWidgetOptionsValues,
    GameWidgetValueParameter,
} from "../gameTypes";
import {
    buildGameWidgetInfo,
    buildWidgetDictionaryProperties,
} from "../utilities/buildGameWidgetInfoDictionary";

export default () => {
    const {
        widgets,
        widgetsIds,
        widgetsInfoDictionary,
        addWidget,
        updateWidgetInfo,
        updateWidgetsOrder,
        selectWidget,
        selectedWidgets,
        copyWidget,
        removeWidgetSelection,
    } = useWidgets();
    const { widgetsModules } = useWidgetsModules();
    const { updateSelectedWidgetProperties } = useUI();

    const selectedGameWidgets = useMemo(
        () =>
            selectedWidgetsFilter<GameWidgetDictionaryItem>(selectedWidgets, WidgetType.GameObject),
        [selectedWidgets]
    );

    const gameWidgets = useMemo(
        () => widgetsFilter<GameWidgetDictionary>(widgets, WidgetType.GameObject),
        [widgets]
    );

    const gameWidgetsModules = useMemo(
        () => widgetsModulesFilter<GameWidgetModule>(widgetsModules, WidgetType.GameObject),
        [widgetsModules]
    );

    const gameWidgetsInfo = useMemo(
        () =>
            widgetsInfoFilter<GameWidgetInfoDictionary>(
                widgetsInfoDictionary,
                widgets,
                WidgetType.GameObject
            ),
        [widgets, widgetsInfoDictionary]
    );

    const gameWidgetsIds = useMemo(
        () => widgetsIdsFilter(widgets, widgetsIds, WidgetType.GameObject),
        [widgets, widgetsIds]
    );

    const getGameWidgetById = useCallback(
        (id: string | undefined) => {
            if (id) {
                return gameWidgets[id];
            }
        },
        [gameWidgets]
    );

    const getGameWidgetInfoById = useCallback(
        (id: string | undefined) => {
            if (id) {
                return gameWidgetsInfo?.[id];
            }
        },
        [gameWidgetsInfo]
    );

    const getGameWidgetInfoFromWidget = useCallback(
        (widgetId: string | undefined) => {
            if (widgetId) {
                return gameWidgetsInfo[widgetId];
            }
        },
        [gameWidgetsInfo]
    );

    const addGameWidget = useCallback(
        (gameWidget: GameWidgetDictionaryItem) => {
            addWidget(gameWidget, buildGameWidgetInfo);
        },
        [addWidget]
    );

    const addGameWidgetChild = useCallback(
        (hoveredItemId: string, draggingItemId: string) => {
            const widgetsIdsWithoutDraggingWidget: WidgetsIds = widgetsIds.filter(
                (x) => x.id !== draggingItemId
            );

            const newWidgetsIds: WidgetsIds = widgetsIdsWithoutDraggingWidget.map((x) => {
                if (x.id === hoveredItemId) {
                    return {
                        id: x.id,
                        children: [
                            {
                                id: draggingItemId,
                            },
                        ],
                    };
                }

                return x;
            });

            removeWidgetSelection();

            updateWidgetsOrder(newWidgetsIds);
        },
        [removeWidgetSelection, updateWidgetsOrder, widgetsIds]
    );

    const updateGameWidgetWithMesh = useCallback(
        (widgetId: string, mesh: Object3D | undefined, updateOnlyUI?: boolean) => {
            if (mesh) {
                const widgetProperties = buildWidgetDictionaryProperties(mesh);

                if (updateOnlyUI) {
                    updateSelectedWidgetProperties(widgetProperties);
                } else {
                    updateWidgetInfo<GameWidgetValueParameter>(widgetId, {
                        properties: widgetProperties,
                    });
                }
            }
        },
        [updateSelectedWidgetProperties, updateWidgetInfo]
    );

    const updateGameWidgetInfo = useCallback(
        (widgetId: string, value: GameWidgetValueParameter) => {
            updateWidgetInfo(widgetId, value);

            if (value.properties) {
                updateSelectedWidgetProperties(value.properties);
            }
        },
        [updateSelectedWidgetProperties, updateWidgetInfo]
    );

    const updateCurrentGameWidgetOptions = useCallback(
        <TValue = string>(widgetOptions: GameWidgetOptionsValues<TValue>) => {
            const currentWidget = selectedGameWidgets[0];

            updateWidgetInfo<GameWidgetValueParameter<TValue>>(currentWidget.id, {
                options: widgetOptions,
            });
        },
        [selectedGameWidgets, updateWidgetInfo]
    );

    const selectGameWidget = useCallback(
        (widgetsToSelect: GameWidgetDictionaryItem[], forceSelect = false) => {
            if (!forceSelect && widgetsToSelect[0].isFrozen) {
                return;
            }

            const { properties } = gameWidgetsInfo[widgetsToSelect[0].id];
            selectWidget(widgetsToSelect);

            if (properties) {
                updateSelectedWidgetProperties(properties);
                updateGameWidgetInfo(widgetsToSelect[0].id, { properties });
            }
        },
        [gameWidgetsInfo, selectWidget, updateSelectedWidgetProperties, updateGameWidgetInfo]
    );

    const getGameWidgetByMesh = useCallback(
        (mesh: Object3D) => {
            let widgetMesh: Object3D | undefined;

            if (mesh.name.startsWith(gameWidgetPrefix)) {
                widgetMesh = mesh;
            } else {
                mesh.traverseAncestors((object) => {
                    if (object.name.startsWith(gameWidgetPrefix)) {
                        widgetMesh = object;
                    }
                });
            }

            const widgetIdInMesh = widgetMesh?.name.split("+")[2];
            const widget = getGameWidgetById(widgetIdInMesh);

            return { widget, widgetMesh };
        },
        [getGameWidgetById]
    );

    const selectGameWidgetFromMeshArr = useCallback(
        (meshArray: Object3D[]) => {
            if (meshArray.length) {
                const { widget } = getGameWidgetByMesh(meshArray[0]);

                if (widget) {
                    selectGameWidget([widget]);
                }
            }
        },
        [getGameWidgetByMesh, selectGameWidget]
    );

    const copyGameWidget = useCallback(
        (widget: GameWidgetDictionaryItem) => {
            const properties = gameWidgetsInfo[widget.id].properties;
            const options = gameWidgetsInfo[widget.id].options;

            const widgetInfo = buildGameWidgetInfo(widget, {
                properties,
                options,
            });

            copyWidget(widget, widgetInfo);
        },
        [copyWidget, gameWidgetsInfo]
    );

    return {
        selectedGameWidgets,
        getGameWidgetById,
        getGameWidgetInfoById,
        addGameWidget,
        addGameWidgetChild,
        gameWidgets,
        gameWidgetsModules,
        gameWidgetsInfo,
        gameWidgetsIds,
        selectGameWidgetFromMeshArr,
        copyGameWidget,
        updateCurrentGameWidgetOptions,
        selectGameWidget,
        updateGameWidgetWithMesh,
        updateGameWidgetInfo,
        getGameWidgetInfoFromWidget,
    };
};
