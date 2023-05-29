import { useWidgets, WidgetType } from "@engine/api";
import useUI from "@engine/App/UI/_actions/hooks/useUI";
import widgetsFilter from "@engine/App/Widgets/_actions/filters/widgetsFilter";
import widgetsIdsFilter from "@engine/App/Widgets/_actions/filters/widgetsIdsFilter";
import widgetsInfoFilter from "@engine/App/Widgets/_actions/filters/widgetsInfoFilter";
import { Object3D } from "@granity/three";
import { useCallback, useMemo } from "react";

import { gameWidgetPrefix } from "../gameConstants";
import {
    GameWidgetDictionaryItem,
    GameWidgetOptionsValues,
    GameWidgetValueParameter,
} from "../gameTypes";
import {
    buildGameWidgetInfo,
    buildWidgetDictionaryProperties,
} from "../utilities/buildGameWidgetInfoDictionary";

export default () => {
    const { widgets, widgetsInfoDictionary, addWidget, updateWidget, getWidgetById } = useWidgets();
    const { updateSelectedWidgetProperties } = useUI();

    const gameWidgets = useMemo(() => widgetsFilter(widgets, WidgetType.GameObject), [widgets]);
    const gameWidgetsInfo = useMemo(
        () => widgetsInfoFilter(widgetsInfoDictionary, widgets, WidgetType.GameObject),
        [widgets, widgetsInfoDictionary]
    );
    const gameWidgetsIds = useMemo(
        () => widgetsIdsFilter(widgets, WidgetType.GameObject),
        [widgets]
    );

    const addGameWidget = useCallback(
        (gameWidget: GameWidgetDictionaryItem) => {
            addWidget(gameWidget, buildGameWidgetInfo);
        },
        [addWidget]
    );

    const updatetWidgetWithMesh = useCallback(
        (widgetId: string, mesh: Object3D | undefined, updateOnlyUI?: boolean) => {
            if (mesh) {
                const widgetProperties = buildWidgetDictionaryProperties(mesh);

                if (updateOnlyUI) {
                    updateSelectedWidgetProperties(widgetProperties);
                } else {
                    updateWidget<GameWidgetValueParameter>(widgetId, {
                        properties: widgetProperties,
                    });
                }
            }
        },
        [updateSelectedWidgetProperties, updateWidget]
    );

    const updateGameWidget = useCallback(
        (widgetId: string, value: GameWidgetValueParameter) => {
            updateWidget(widgetId, value);

            if (value.properties) {
                updateSelectedWidgetProperties(value.properties);
            }
        },
        [updateSelectedWidgetProperties, updateWidget]
    );

    const updateCurrentWGameidgetOptions = useCallback(
        <TValue = string>(widgetOptions: GameWidgetOptionsValues<TValue>) => {
            const currentWidget = selectedWidgets[0];

            updateWidget<GameWidgetValueParameter<TValue>>(currentWidget.id, {
                options: widgetOptions,
            });
        },
        [updateWidget]
    );

    const selectGameWidget = useCallback(
        (widgetsToSelect: GameWidgetDictionaryItem[], forceSelect = false) => {
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

    const getWidgetByMesh = useCallback(
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
            const widget = getWidgetById(widgetIdInMesh);

            return { widget, widgetMesh };
        },
        [getWidgetById]
    );

    return { addGameWidget };
};
