import { usePrevious } from "@granity/helpers";
import useWidgets from "@granity-engine/App/Widgets/_actions/hooks/useWidgets";
import { useEffect } from "react";

import useHistory from "./useHistory";

export default () => {
    const { widgets, widgetsObjectInfoDictionary, resetWidgets } = useWidgets();
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
                widgetsObjectInfoDictionary,
            });
        }
    }, [addHistoryState, shouldAddHistory, widgets, widgetsObjectInfoDictionary]);

    useEffect(() => {
        if (shouldResetWidgets) {
            setShouldAddHistoryState(true);
            resetWidgets(
                currentHistoryItem!.state.widgets,
                currentHistoryItem!.state.widgetsObjectInfoDictionary
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
