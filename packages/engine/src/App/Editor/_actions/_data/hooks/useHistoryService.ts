import { uidGenerator } from "@granity/helpers";
import { useCallback } from "react";

import { HistoryItem, HistoryState } from "../../editorTypes";
import useHistoryContext from "./useHistoryContext";

export default () => {
    const {
        historyDictionary,
        currentHistoryItem,
        shouldAddHistoryState,
        setShouldAddHistoryState,
        setHistoryDictionary,
        setCurrentHistoryItem,
        previousHistoryItem,
        setPreviousHistoryItem,
    } = useHistoryContext();

    const setCurrent = useCallback(
        (historyItem: HistoryItem) => {
            setCurrentHistoryItem(historyItem);
            setPreviousHistoryItem(currentHistoryItem);
        },
        [currentHistoryItem, setCurrentHistoryItem, setPreviousHistoryItem]
    );

    const setPrevious = useCallback(
        (historyItem: HistoryItem) => {
            setPreviousHistoryItem(historyItem);
        },
        [setPreviousHistoryItem]
    );

    const add = useCallback(
        (state: HistoryState) => {
            const id = uidGenerator();
            const order = Object.keys(historyDictionary).length;
            const historyItem = {
                id,
                order,
                state,
            };

            setHistoryDictionary({
                ...historyDictionary,
                [id]: historyItem,
            });

            setCurrent(historyItem);
        },
        [historyDictionary, setHistoryDictionary, setCurrent]
    );

    return {
        historyDictionary,
        currentHistoryItem,
        shouldAddHistoryState,
        setShouldAddHistoryState,
        add,
        setCurrent,
        previousHistoryItem,
        setPrevious,
    };
};
