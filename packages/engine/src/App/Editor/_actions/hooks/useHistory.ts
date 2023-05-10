import { useScenes } from "@engine/api";
import useCore from "@engine/App/Core/_actions/hooks/useCore";
import useWidgets from "@engine/App/Widgets/_actions/hooks/useWidgets";
import { isEqual, usePrevious } from "@granity/helpers";
import { useCallback, useMemo } from "react";

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
        add,
        setCurrent,
        previousHistoryItem,
        setPrevious,
    } = useHistoryService();
    const { hasEdited } = useEditor();
    const previousCurrentHistoryItem = usePrevious(currentHistoryItem);
    const previousWidgetsDictionary = usePrevious(widgetsObjectInfoDictionary);
    const previousWidgets = usePrevious(widgets);
    const { currentSceneId } = useScenes();
    const { app } = useCore();

    const shouldResetWidgets = useMemo(
        () =>
            hasEdited &&
            currentHistoryItem?.state.widgets &&
            currentHistoryItem?.state.widgetsObjectInfoDictionary &&
            !isEqual(currentHistoryItem, previousCurrentHistoryItem),
        [currentHistoryItem, hasEdited, previousCurrentHistoryItem]
    );

    const widgetsChanged = useMemo(
        () =>
            previousWidgets !== undefined &&
            previousWidgetsDictionary !== undefined &&
            (!isEqual(widgets, previousWidgets) ||
                !isEqual(widgetsObjectInfoDictionary, previousWidgetsDictionary)),
        [previousWidgets, previousWidgetsDictionary, widgets, widgetsObjectInfoDictionary]
    );

    const editorStateChanged = useMemo(
        () => shouldAddHistoryState && widgetsChanged,
        [shouldAddHistoryState, widgetsChanged]
    );

    const shouldUpdateAppStatus = useMemo(
        () =>
            editorStateChanged &&
            Object.keys(previousWidgets || {}).length &&
            Object.keys(previousWidgetsDictionary || {}).length,
        [editorStateChanged, previousWidgets, previousWidgetsDictionary]
    );

    const isCurrentHistoryItemIsSaved = useMemo(
        () =>
            previousWidgets !== undefined &&
            previousWidgetsDictionary !== undefined &&
            currentSceneId &&
            isEqual(
                widgetsObjectInfoDictionary,
                app?.savedScenes?.scenes?.[currentSceneId].data.widgetsObjectInfoDictionary
            ),
        [
            app?.savedScenes?.scenes,
            currentSceneId,
            previousWidgets,
            previousWidgetsDictionary,
            widgetsObjectInfoDictionary,
        ]
    );

    const isCurrentHistoryItemIsPublished = useMemo(
        () =>
            previousWidgets !== undefined &&
            previousWidgetsDictionary !== undefined &&
            currentSceneId &&
            isEqual(
                widgetsObjectInfoDictionary,
                app?.publishedScenes?.scenes?.[currentSceneId].data.widgetsObjectInfoDictionary
            ),
        [
            app?.publishedScenes?.scenes,
            currentSceneId,
            previousWidgets,
            previousWidgetsDictionary,
            widgetsObjectInfoDictionary,
        ]
    );

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
        shouldUpdateAppStatus,
        editorStateChanged,
        isCurrentHistoryItemIsSaved,
        isCurrentHistoryItemIsPublished,
        widgetsChanged,
        previousHistoryItem,
    };
};
