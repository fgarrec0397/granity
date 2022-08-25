import { usePrevious } from "@app/Common/hooks";
import { uidGenerator } from "@app/Common/utilities";
import { useCallback, useEffect, useState } from "react";

import { HistoryDictionary, HistoryItem, HistoryState } from "../../editorTypes";
import useHistoryContext from "./useHistoryContext";

const useHandleNextHistoryItem = (
    historyDictionary: HistoryDictionary,
    callback: (historyItem: HistoryItem) => void
) => {
    const previousHistoryDictionary = usePrevious(historyDictionary);
    const [historyItemToset, setHistoryItemToset] = useState<HistoryItem>();

    // TODO -- See to clean this
    useEffect(() => {
        if (
            previousHistoryDictionary &&
            historyItemToset &&
            Object.keys(historyDictionary).length > Object.keys(previousHistoryDictionary).length
        ) {
            callback(historyItemToset);
        }
    }, [historyDictionary, historyItemToset, previousHistoryDictionary, callback]);

    return setHistoryItemToset;
};

export default () => {
    const { historyDictionary, setHistoryDictionary, setCurrentHistoryItem } = useHistoryContext();
    const set = useCallback(
        (historyItem: HistoryItem) => {
            setCurrentHistoryItem(historyItem);
        },
        [setCurrentHistoryItem]
    );
    const setHistoryItemToset = useHandleNextHistoryItem(historyDictionary, set);
    // const previousHistoryDictionary = usePrevious(historyDictionary);
    // const [historyItemToset, setHistoryItemToset] = useState<HistoryItem>();

    // // TODO -- See to clean this
    // useEffect(() => {
    //     if (
    //         previousHistoryDictionary &&
    //         historyItemToset &&
    //         Object.keys(historyDictionary).length > Object.keys(previousHistoryDictionary).length
    //     ) {
    //         set(historyItemToset);
    //     }
    // }, [historyDictionary, historyItemToset, previousHistoryDictionary, set]);

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

            setHistoryItemToset(historyItem); // set the next current history item
        },
        [historyDictionary, setHistoryDictionary, setHistoryItemToset]
    );

    return { add, set };
};
