import { useCallback } from "react";

import { GameWidgetDictionary, GameWidgetInfoDictionary } from "../gameTypes";
import { buildGameWidgetInfoDictionary } from "../utilities/buildGameWidgetInfoDictionary";
import useGameWidgetsUtilities from "./useGameWidgetsUtilities";

export default () => {
    const { synchGameWidgetsInfoDictionary } = useGameWidgetsUtilities();

    const initGameWidgets = useCallback(
        (
            gameWidgets?: GameWidgetDictionary,
            gameWidgetsInfoDictionary?: GameWidgetInfoDictionary
        ) => {
            if (gameWidgets || gameWidgetsInfoDictionary) {
                const localGameWidgetsInfoDictionary = buildGameWidgetInfoDictionary(gameWidgets!); // already checked if it's defined
                const synchedGameWidgetsInfoDictionary = synchGameWidgetsInfoDictionary(
                    localGameWidgetsInfoDictionary,
                    gameWidgetsInfoDictionary! // already checked if it's defined
                );

                return synchedGameWidgetsInfoDictionary;
            }
        },
        [synchGameWidgetsInfoDictionary]
    );

    return {
        initGameWidgets,
    };
};
