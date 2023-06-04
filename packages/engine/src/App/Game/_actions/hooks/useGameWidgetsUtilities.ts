import { cloneDeep } from "@granity/helpers";
import { useCallback } from "react";

import { GameWidgetInfoDictionary } from "../gameTypes";
import populateGameWidgetProps from "../utilities/populateGameWidgetProps";
import useGameWidgets from "./useGameWidgets";

export default () => {
    const { gameWidgetsInfo } = useGameWidgets();

    const getGameWidgetProps = useCallback(
        (id: string) => {
            return {
                ...populateGameWidgetProps(id, gameWidgetsInfo),
            };
        },
        [gameWidgetsInfo]
    );

    /**
     * Synchronize two widgets by removing the options from widgetsInfoDictionary2 that are not on widgetsInfoDictionary1
     */
    const synchGameWidgetsInfoDictionary = useCallback(
        (
            gameWidgetsInfoDictionary1?: GameWidgetInfoDictionary,
            gameWidgetsInfoDictionary2?: GameWidgetInfoDictionary
        ) => {
            const clonedWidgetObjectInfoDictionary1 = cloneDeep(gameWidgetsInfoDictionary1);
            const clonedWidgetObjectInfoDictionary2 = cloneDeep(gameWidgetsInfoDictionary2);

            if (!clonedWidgetObjectInfoDictionary1 && !clonedWidgetObjectInfoDictionary2) {
                return;
            }

            if (!clonedWidgetObjectInfoDictionary1 && clonedWidgetObjectInfoDictionary2) {
                return clonedWidgetObjectInfoDictionary2;
            }

            if (clonedWidgetObjectInfoDictionary1 && !clonedWidgetObjectInfoDictionary2) {
                return clonedWidgetObjectInfoDictionary1;
            }

            Object.keys(clonedWidgetObjectInfoDictionary1!).forEach((dictionaryItemKey) => {
                const dictionaryItem = clonedWidgetObjectInfoDictionary1?.[dictionaryItemKey];

                if (clonedWidgetObjectInfoDictionary2?.[dictionaryItemKey]) {
                    for (const key in clonedWidgetObjectInfoDictionary2?.[dictionaryItemKey]
                        .options) {
                        if (!Object.prototype.hasOwnProperty.call(dictionaryItem?.options, key)) {
                            // Remove unexisting options on the local widget definitions options
                            if (
                                clonedWidgetObjectInfoDictionary2?.[dictionaryItemKey].options?.[
                                    key
                                ]
                            ) {
                                delete clonedWidgetObjectInfoDictionary2?.[dictionaryItemKey]
                                    .options?.[key];
                            }
                        }
                    }

                    if (clonedWidgetObjectInfoDictionary1) {
                        clonedWidgetObjectInfoDictionary1[dictionaryItemKey] = {
                            ...clonedWidgetObjectInfoDictionary2?.[dictionaryItemKey],
                        };
                    }
                }
            });

            return clonedWidgetObjectInfoDictionary1;
        },
        []
    );

    return { getGameWidgetProps, synchGameWidgetsInfoDictionary };
};
