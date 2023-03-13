import useWidgets from "@granity/engine/App/Widgets/_actions/hooks/useWidgets";
import { isEqual, usePrevious } from "@granity/helpers";
import { useCallback } from "react";

import useHistoryContext from "../_data/hooks/useHistoryContext";
import useHistoryService from "../_data/hooks/useHistoryService";
import { HistoryState } from "../editorTypes";
import useEditor from "./useEditor";

export default () => {
    const { widgets, widgetsObjectInfoDictionary } = useWidgets();

    const {
        historyDictionary,
        currentHistoryItem,
        shouldAddHistoryState,
        setShouldAddHistoryState,
    } = useHistoryContext();
    const { add, setCurrent } = useHistoryService();
    const { hasEdited } = useEditor();
    const previousCurrentHistoryItem = usePrevious(currentHistoryItem);
    const previousWidgetsDictionary = usePrevious(widgetsObjectInfoDictionary);
    const previousWidgets = usePrevious(widgets);

    const shouldResetWidgets =
        hasEdited &&
        currentHistoryItem?.state.widgets &&
        currentHistoryItem?.state.widgetsObjectInfoDictionary &&
        !isEqual(currentHistoryItem, previousCurrentHistoryItem);

    const shouldAddHistory =
        shouldAddHistoryState &&
        (!isEqual(widgets, previousWidgets) ||
            !isEqual(widgetsObjectInfoDictionary, previousWidgetsDictionary));

    const addHistoryState = useCallback(
        (state: HistoryState) => {
            add(state);
        },
        [add]
    );

    const getHistoryItemId = useCallback(
        (index: number) => {
            return Object.keys(historyDictionary)[index];
        },
        [historyDictionary]
    );

    const setHistoryItem = useCallback(
        (historyItemId: string) => {
            const historyItem = historyDictionary[historyItemId];

            if (
                historyItem &&
                Object.keys(historyItem.state.widgets).length &&
                Object.keys(historyItem.state.widgetsObjectInfoDictionary).length
            ) {
                setShouldAddHistoryState(false);
                setCurrent(historyItem);
            }
        },
        [historyDictionary, setCurrent, setShouldAddHistoryState]
    );

    const setPrevHistoryItem = useCallback(() => {
        const currentHistoryItemIndex = currentHistoryItem?.order;

        if (currentHistoryItemIndex && currentHistoryItemIndex >= 0) {
            const prevHistoryItemId = getHistoryItemId(currentHistoryItemIndex - 1);
            setHistoryItem(prevHistoryItemId);
        }
    }, [currentHistoryItem?.order, getHistoryItemId, setHistoryItem]);

    const setNextHistoryItem = useCallback(() => {
        const currentHistoryItemIndex = currentHistoryItem?.order;

        if (currentHistoryItemIndex && currentHistoryItemIndex >= 0) {
            const nextHistoryItemId = getHistoryItemId(currentHistoryItemIndex + 1);
            setHistoryItem(nextHistoryItemId);
        }
    }, [currentHistoryItem?.order, getHistoryItemId, setHistoryItem]);

    return {
        historyDictionary,
        currentHistoryItem,
        addHistoryState,
        getHistoryItemId,
        setHistoryItem,
        setPrevHistoryItem,
        setNextHistoryItem,
        shouldAddHistoryState,
        setShouldAddHistoryState,
        shouldResetWidgets,
        shouldAddHistory,
    };
};
