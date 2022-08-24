import { useCallback, useEffect, useState } from "react";

import useHistoryContext from "../_data/hooks/useHistoryContext";
import useHistoryService from "../_data/hooks/useHistoryService";
import { HistoryItem, HistoryState } from "../editorTypes";

export default () => {
    const { historyDictionary, currentHistoryItem } = useHistoryContext();
    const { add, set } = useHistoryService();

    useEffect(() => {
        console.log(historyDictionary, "historyDictionary");
    }, [historyDictionary]);

    const setLastHistoryItem = useCallback(() => {
        const lastHistoryStateId =
            Object.keys(historyDictionary)[Object.keys(historyDictionary).length - 1];
        const historyItem = historyDictionary[lastHistoryStateId];
        console.log(historyItem, "historyItem");

        set(historyItem);
    }, [historyDictionary, set]);

    const addHistoryState = useCallback(
        (state: HistoryState) => {
            add(state);
            // setLastHistoryItem();
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
        setLastHistoryItem,
        setPrevHistoryItem,
    };
};
