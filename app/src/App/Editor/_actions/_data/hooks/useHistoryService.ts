import { usePrevious } from "@app/Common/hooks";
import useCurrentState from "@app/Common/hooks/useCurrentState";
import { uidGenerator } from "@app/Common/utilities";
import { useCallback, useEffect, useState } from "react";

import { HistoryItem, HistoryState } from "../../editorTypes";
import useHistoryContext from "./useHistoryContext";

export default () => {
    const { historyDictionary, setHistoryDictionary, setCurrentHistoryItem } = useHistoryContext();
    const previousHistoryDictionary = usePrevious(historyDictionary);
    const [historyItemToset, setHistoryItemToset] = useState<HistoryItem>();
    const { withCurrentState } = useCurrentState();

    const set = useCallback(
        (historyItem: HistoryItem) => {
            setCurrentHistoryItem(historyItem);
        },
        [setCurrentHistoryItem]
    );

    const postAdd = useCallback(
        (historyItem: HistoryItem) => {
            set(historyItem);
        },
        [set]
    );

    useEffect(() => {
        if (
            previousHistoryDictionary &&
            historyItemToset &&
            Object.keys(historyDictionary).length > Object.keys(previousHistoryDictionary).length
        ) {
            postAdd(historyItemToset);
        }
    }, [historyDictionary, historyItemToset, postAdd, previousHistoryDictionary]);

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

            // console.log(historyItem, "historyItem that has just been created");
            withCurrentState<HistoryItem>((historyItemToset2) => set(historyItemToset2));
            // setHistoryItemToset(historyItem);
            // postAdd(historyItem); // TODO -- see why it's not setting up the just create historyItem
        },
        [historyDictionary, set, setHistoryDictionary, withCurrentState]
    );

    return { add, set };
};
