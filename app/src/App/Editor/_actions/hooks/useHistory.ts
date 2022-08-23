import { useCallback } from "react";

import useHistoryContext from "../_data/hooks/useHistoryContext";
import useHistoryService from "../_data/hooks/useHistoryService";
import { HistoryState } from "../editorTypes";

export default () => {
    const { historyDictionary } = useHistoryContext();
    const { add } = useHistoryService();

    const addHistoryState = useCallback(
        (state: HistoryState) => {
            add(state);
        },
        [add]
    );

    const setPrevHistoryState = useCallback(() => {}, []);

    return {
        historyDictionary,
        addHistoryState,
    };
};
