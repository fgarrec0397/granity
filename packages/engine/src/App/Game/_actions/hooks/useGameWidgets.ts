import { useWidgets } from "@engine/api";
import { useCallback } from "react";

import { GameWidgetDictionaryItem } from "../gameTypes";
import { buildGameWidgetInfo } from "../utilities/buildGameWidgetInfoDictionary";

export default () => {
    const { addWidget } = useWidgets();

    const addGameWidget = useCallback(
        (gameWidget: GameWidgetDictionaryItem) => {
            addWidget(gameWidget, buildGameWidgetInfo);
        },
        [addWidget]
    );

    return { addGameWidget };
};
