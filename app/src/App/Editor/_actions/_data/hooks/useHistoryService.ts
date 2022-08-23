import { uidGenerator } from "@app/Common/utilities";
import { useCallback } from "react";

import { HistoryState } from "../../editorTypes";
import useHistoryContext from "./useHistoryContext";

export default () => {
    const { setHistoryDictionary } = useHistoryContext();

    const add = useCallback(
        (state: HistoryState) => {
            const id = uidGenerator();

            setHistoryDictionary((prevHistory) => ({
                ...prevHistory,
                [id]: {
                    order: Object.keys(prevHistory).length + 1,
                    state,
                },
            }));
        },
        [setHistoryDictionary]
    );

    return { add };
};
