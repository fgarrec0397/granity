import { usePrevious } from "@app/Common/hooks";
import { useWidgets } from "@app/Widgets/_actions/hooks";
import isEqual from "lodash/isEqual";
import { useEffect } from "react";

import useHasEdited from "./useHasEdited";
import useHistory from "./useHistory";

export default () => {
    const { widgets, widgetsDictionary, resetWidgets } = useWidgets();
    const hasEdited = useHasEdited();
    const previousWidgets = usePrevious(widgets);
    const previousWidgetsDictionary = usePrevious(widgetsDictionary);
    const { addHistoryState, currentHistoryItem } = useHistory();
    const previousCurrentHistoryItem = usePrevious(currentHistoryItem);

    useEffect(() => {
        if (
            !isEqual(widgets, previousWidgets) ||
            !isEqual(widgetsDictionary, previousWidgetsDictionary)
        ) {
            addHistoryState({
                widgets,
                widgetsDictionary,
            });
        }
    }, [addHistoryState, previousWidgets, previousWidgetsDictionary, widgets, widgetsDictionary]);

    useEffect(() => {
        if (
            hasEdited &&
            currentHistoryItem?.state.widgets &&
            currentHistoryItem?.state.widgetsDictionary &&
            !isEqual(currentHistoryItem, previousCurrentHistoryItem)
        ) {
            resetWidgets(
                currentHistoryItem.state.widgets,
                currentHistoryItem.state.widgetsDictionary
            );
        }
    }, [currentHistoryItem, previousCurrentHistoryItem, resetWidgets, hasEdited]);
};
