import { uidGenerator } from "helpers-granity";
import { useCallback } from "react";

import { HistoryItem, HistoryState } from "../../editorTypes";
import useHistoryContext from "./useHistoryContext";

export default () => {
    const { historyDictionary, setHistoryDictionary, setCurrentHistoryItem } = useHistoryContext();

    const setCurrent = useCallback(
        (historyItem: HistoryItem) => {
            setCurrentHistoryItem(historyItem);
        },
        [setCurrentHistoryItem]
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

    return { add, setCurrent };
};
