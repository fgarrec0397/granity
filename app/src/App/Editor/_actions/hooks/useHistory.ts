import { useCallback, useEffect, useState } from "react";

import useHistoryContext from "../_data/hooks/useHistoryContext";
import useHistoryService from "../_data/hooks/useHistoryService";
import { HistoryItem, HistoryState } from "../editorTypes";

export default () => {
    const { historyDictionary, currentHistoryItem } = useHistoryContext();
    const { add, set } = useHistoryService();

    useEffect(() => {
        console.log(currentHistoryItem, "currentHistoryItem has changed");
    }, [currentHistoryItem]);

    useEffect(() => {
        console.log(historyDictionary, "historyDictionary");
    }, [historyDictionary]);

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
            console.log(prevHistoryItemId, "prevHistoryItemId");
            set(historyDictionary[prevHistoryItemId]);
        }
    }, [currentHistoryItem?.order, historyDictionary, set]);

    return {
        historyDictionary,
        currentHistoryItem,
        addHistoryState,
        // setLastHistoryItem,
        setPrevHistoryItem,
    };
};
