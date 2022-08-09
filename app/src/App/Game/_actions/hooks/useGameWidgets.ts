import { WidgetObjects, WidgetsDictionary } from "@app/Widgets/_actions/widgetsTypes";
import { useCallback } from "react";
import { useDispatch } from "react-redux";

import useGameSelector from "../_data/hooks/useGameSelector";
import useGameWidgetsContext from "../_data/hooks/useGameWidgetsContext";
import { addBatchWidgetDictionary } from "../_data/state/gameReducer";

export default () => {
    const { widgetsDictionary } = useGameSelector();
    const { setWidgets, widgets } = useGameWidgetsContext();
    const dispatch = useDispatch();

    const initGameWidgets = useCallback(
        (newWidgetsDictionary: WidgetsDictionary, newWidgets: WidgetObjects) => {
            setWidgets({ ...newWidgets });
            dispatch(addBatchWidgetDictionary(newWidgetsDictionary));
        },
        [dispatch, setWidgets]
    );

    const removeGameWidgets = useCallback(() => {
        for (const key in widgets) {
            delete widgets[key];
        }
    }, [widgets]);

    return {
        gameWidgets: widgets,
        gameWidgetsDictionary: widgetsDictionary,
        initGameWidgets,
        removeGameWidgets,
    };
};
