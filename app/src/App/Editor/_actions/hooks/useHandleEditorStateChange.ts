import { usePrevious } from "@app/Common/hooks";
import useWidgets from "@app/Widgets/_actions/hooks/useWidgets";
import { useEffect } from "react";

import useHistory from "./useHistory";

export default () => {
    const { widgets, widgetsInfoDictionary, resetWidgets } = useWidgets();
    const {
        addHistoryState,
        currentHistoryItem,
        setShouldAddHistoryState,
        shouldResetWidgets,
        shouldAddHistory,
    } = useHistory();
    const previousCurrentHistoryItem = usePrevious(currentHistoryItem);

    useEffect(() => {
        if (shouldAddHistory) {
            addHistoryState({
                widgets,
                widgetsInfoDictionary,
            });
        }
    }, [addHistoryState, shouldAddHistory, widgets, widgetsInfoDictionary]);

    useEffect(() => {
        if (shouldResetWidgets) {
            setShouldAddHistoryState(true);
            resetWidgets(
                currentHistoryItem!.state.widgets,
                currentHistoryItem!.state.widgetsInfoDictionary
            );
        }
    }, [
        currentHistoryItem,
        previousCurrentHistoryItem,
        resetWidgets,
        setShouldAddHistoryState,
        shouldResetWidgets,
    ]);
};
