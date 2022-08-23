import { usePrevious } from "@app/Common/hooks";
import { useWidgets } from "@app/Widgets/_actions/hooks";
import isEqual from "lodash/isEqual";
import { useEffect } from "react";

import useHistory from "./useHistory";

export default () => {
    const { widgets, widgetsDictionary } = useWidgets();
    const previousWidgets = usePrevious(widgets);
    const previousWidgetsDictionary = usePrevious(widgetsDictionary);
    const { addHistoryState } = useHistory();

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
};
