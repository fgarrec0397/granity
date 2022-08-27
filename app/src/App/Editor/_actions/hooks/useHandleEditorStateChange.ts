import { usePrevious } from "@app/Common/hooks";
import { useWidgets } from "@app/Widgets/_actions/hooks";
import { useEffect } from "react";

import useHistory from "./useHistory";

export default () => {
    const { widgets, widgetsDictionary, resetWidgets } = useWidgets();
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
                widgetsDictionary,
            });
        }
    }, [addHistoryState, shouldAddHistory, widgets, widgetsDictionary]);

    useEffect(() => {
        if (shouldResetWidgets) {
            setShouldAddHistoryState(true);
            resetWidgets(
                currentHistoryItem!.state.widgets,
                currentHistoryItem!.state.widgetsDictionary
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
