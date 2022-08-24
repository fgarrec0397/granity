import { uidGenerator } from "@app/Common/utilities";
import { useCallback } from "react";

import { HistoryItem, HistoryState } from "../../editorTypes";
import useHistoryContext from "./useHistoryContext";

export default () => {
    const { historyDictionary, setHistoryDictionary, setCurrentHistoryItem } = useHistoryContext();

    const set = useCallback(
        (historyItem: HistoryItem) => {
            setCurrentHistoryItem(historyItem);
        },
        [setCurrentHistoryItem]
    );

    const postAdd = useCallback(
        (historyItem: HistoryItem) => {
            setInterval(() => set(historyItem), 3000);
        },
        [set]
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

            postAdd(historyItem); // TODO -- see why it's not setting up the just create historyItem
        },
        [historyDictionary, postAdd, setHistoryDictionary]
    );

    return { add, set };
};
