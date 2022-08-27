import { useCallback } from "react";

import useHistoryContext from "../_data/hooks/useHistoryContext";
import useHistoryService from "../_data/hooks/useHistoryService";
import { HistoryState } from "../editorTypes";

export default () => {
    const { historyDictionary, currentHistoryItem } = useHistoryContext();
    const { add, setCurrent } = useHistoryService();

    const addHistoryState = useCallback(
        (state: HistoryState) => {
            add(state);
        },
        [add]
    );

    const setPrevHistoryItem = useCallback(() => {
        const currentHistoryItemIndex = currentHistoryItem?.order;

        if (currentHistoryItemIndex) {
            const prevHistoryItemId = Object.keys(historyDictionary)[currentHistoryItemIndex - 1];

            setCurrent(historyDictionary[prevHistoryItemId]);
        }
    }, [currentHistoryItem?.order, historyDictionary, setCurrent]);

    return {
        historyDictionary,
        currentHistoryItem,
        addHistoryState,
        setPrevHistoryItem,
    };
};
