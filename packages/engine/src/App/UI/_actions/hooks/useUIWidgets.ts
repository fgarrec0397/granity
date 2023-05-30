import {
    GameWidgetDictionary,
    GameWidgetInfoDictionary,
    useWidgets,
    WidgetType,
} from "@engine/api";
import selectedWidgetsFilter from "@engine/App/Widgets/_actions/filters/selectedWidgetsFilter";
import widgetsFilter from "@engine/App/Widgets/_actions/filters/widgetsFilter";
import widgetsIdsFilter from "@engine/App/Widgets/_actions/filters/widgetsIdsFilter";
import widgetsInfoFilter from "@engine/App/Widgets/_actions/filters/widgetsInfoFilter";
import { useCallback, useMemo } from "react";

import useUIService from "../_data/hooks/useUIService";
import { UIWidgetDictionaryItem } from "../uiTypes";

export default () => {
    const { selectedWidgetProperties } = useUIService();
    const {
        widgets,
        widgetsInfoDictionary,
        addWidget,
        updateWidget,
        getWidgetById,
        selectWidget,
        selectedWidgets,
        copyWidget,
    } = useWidgets();

    const selectedUIWidgets = useMemo(
        () => selectedWidgetsFilter<UIWidgetDictionaryItem>(selectedWidgets, WidgetType.UI),
        [selectedWidgets]
    );

    const uiWidgets = useMemo(
        () => widgetsFilter<GameWidgetDictionary>(widgets, WidgetType.UI),
        [widgets]
    );

    const uiWidgetsInfo = useMemo(
        () =>
            widgetsInfoFilter<GameWidgetInfoDictionary>(
                widgetsInfoDictionary,
                widgets,
                WidgetType.UI
            ),
        [widgets, widgetsInfoDictionary]
    );
    const uiWidgetsIds = useMemo(() => widgetsIdsFilter(widgets, WidgetType.UI), [widgets]);

    const getUIWidgetById = useCallback(
        (id: string | undefined) => {
            if (id) {
                return uiWidgets[id];
            }
        },
        [uiWidgets]
    );

    const getUIWidgetInfoById = useCallback(
        (id: string | undefined) => {
            if (id) {
                return uiWidgetsInfo?.[id];
            }
        },
        [uiWidgetsInfo]
    );

    const getUIWidgetInfoFromWidget = useCallback(
        (widgetId: string | undefined) => {
            if (widgetId) {
                return uiWidgetsInfo[widgetId];
            }
        },
        [uiWidgetsInfo]
    );

    const addUIWidget = useCallback(
        (uiWidget: UIWidgetDictionaryItem) => {
            addWidget(uiWidget);
        },
        [addWidget]
    );

    return {
        addUIWidget,
        selectedWidgetProperties,
        selectedUIWidgets,
        uiWidgets,
        uiWidgetsInfo,
        uiWidgetsIds,
        getUIWidgetById,
        getUIWidgetInfoById,
        getUIWidgetInfoFromWidget,
    };
};
