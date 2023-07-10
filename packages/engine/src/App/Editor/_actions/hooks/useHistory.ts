import { useScenes } from "@engine/api";
import useCore from "@engine/App/Core/_actions/hooks/useCore";
import useWidgets from "@engine/App/Widgets/_actions/hooks/useWidgets";
import { isEqual, usePrevious } from "@granity/helpers";
import { useCallback, useEffect, useMemo, useState } from "react";

import useHistoryService from "../_data/hooks/useHistoryService";
import { HistoryState } from "../editorTypes";
import useEditor from "./useEditor";

export default () => {
    const [canResetWidgets, setCanResetWidgets] = useState(false);
    const { widgets, widgetsInfoDictionary, widgetsIds, resetWidgets } = useWidgets();
    const {
        historyDictionary,
        currentHistoryItem,
        shouldAddHistoryState,
        setShouldAddHistoryState,
        add,
        setCurrent,
        previousHistoryItem,
    } = useHistoryService();
    const { hasEdited } = useEditor();
    const previousCurrentHistoryItem = usePrevious(currentHistoryItem);
    const previousWidgetsDictionary = usePrevious(widgetsInfoDictionary);
    const previousWidgetsIds = usePrevious(widgetsIds);
    const previousWidgets = usePrevious(widgets);
    const { currentSceneId } = useScenes();
    const { app } = useCore();

    /**
     * This value indicates if we are able to reset the widgets by checking if there
     * has already been a currentHistoryItem declared and if it is not equal to the previous one
     */
    const shouldResetWidgets = useMemo(
        () =>
            hasEdited &&
            currentHistoryItem?.state.widgets &&
            currentHistoryItem?.state.widgetsInfoDictionary &&
            currentHistoryItem?.state.widgetsIds &&
            !isEqual(currentHistoryItem, previousCurrentHistoryItem),
        [currentHistoryItem, hasEdited, previousCurrentHistoryItem]
    );

    const widgetsIdsOrderChanged = useMemo(() => {
        return !isEqual(widgetsIds, previousWidgetsIds);
    }, [previousWidgetsIds, widgetsIds]);

    /**
     * This value indicates if the widgets have changed. It also make sure the
     * previous one is not undefined
     */
    const widgetsChanged = useMemo(() => {
        return (
            previousWidgets !== undefined &&
            previousWidgetsDictionary !== undefined &&
            (!isEqual(widgets, previousWidgets) ||
                !isEqual(widgetsInfoDictionary, previousWidgetsDictionary) ||
                widgetsIdsOrderChanged)
        );
    }, [
        previousWidgets,
        previousWidgetsDictionary,
        widgets,
        widgetsIdsOrderChanged,
        widgetsInfoDictionary,
    ]);

    const editorStateChanged = useMemo(() => {
        return shouldAddHistoryState && widgetsChanged;
    }, [shouldAddHistoryState, widgetsChanged]);

    const shouldUpdateAppStatus = useMemo(
        () =>
            editorStateChanged &&
            Object.keys(previousWidgets || {}).length &&
            Object.keys(previousWidgetsDictionary || {}).length &&
            previousWidgetsIds?.length,
        [editorStateChanged, previousWidgets, previousWidgetsDictionary, previousWidgetsIds?.length]
    );

    const isCurrentHistoryItemIsSaved = useMemo(
        () =>
            previousWidgets !== undefined &&
            previousWidgetsDictionary !== undefined &&
            currentSceneId &&
            isEqual(
                widgetsInfoDictionary,
                app?.savedScenes?.scenes?.[currentSceneId]?.data.widgetsInfoDictionary
            ),
        [
            app?.savedScenes?.scenes,
            currentSceneId,
            previousWidgets,
            previousWidgetsDictionary,
            widgetsInfoDictionary,
        ]
    );

    const isCurrentHistoryItemIsPublished = useMemo(
        () =>
            previousWidgets !== undefined &&
            previousWidgetsDictionary !== undefined &&
            currentSceneId &&
            isEqual(
                widgetsInfoDictionary,
                app?.publishedScenes?.scenes?.[currentSceneId]?.data.widgetsInfoDictionary
            ),
        [
            app?.publishedScenes?.scenes,
            currentSceneId,
            previousWidgets,
            previousWidgetsDictionary,
            widgetsInfoDictionary,
        ]
    );

    useEffect(() => {
        if (canResetWidgets && shouldResetWidgets) {
            resetWidgets(
                currentHistoryItem?.state.widgets,
                currentHistoryItem?.state.widgetsInfoDictionary,
                currentHistoryItem?.state.widgetsIds
            );

            setCanResetWidgets(false);
        }
    }, [
        canResetWidgets,
        currentHistoryItem?.state.widgets,
        currentHistoryItem?.state.widgetsIds,
        currentHistoryItem?.state.widgetsInfoDictionary,
        resetWidgets,
        shouldResetWidgets,
    ]);

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

    const getHistoryItemById = useCallback(
        (id: string) => {
            return historyDictionary[id];
        },
        [historyDictionary]
    );

    const setHistoryItem = useCallback(
        (historyItemId: string, prevHistoryItemId?: string) => {
            const historyItem = historyDictionary[historyItemId];
            const prevHistoryItem = prevHistoryItemId
                ? historyDictionary[prevHistoryItemId]
                : undefined;

            if (
                historyItem &&
                Object.keys(historyItem.state.widgets).length &&
                Object.keys(historyItem.state.widgetsInfoDictionary).length &&
                historyItem.state.widgetsIds
            ) {
                setShouldAddHistoryState(false);
                setCurrent(historyItem, prevHistoryItem);
            }
        },
        [historyDictionary, setCurrent, setShouldAddHistoryState]
    );

    const setPrevHistoryItem = useCallback(() => {
        const currentHistoryItemIndex = currentHistoryItem?.order;
        const previousHistoryItemIndex = previousHistoryItem?.order;
        const hasChangedDuringUndo =
            previousHistoryItemIndex &&
            currentHistoryItemIndex &&
            (currentHistoryItemIndex - previousHistoryItemIndex < -1 ||
                currentHistoryItemIndex - previousHistoryItemIndex > 1);

        if (!currentHistoryItemIndex || currentHistoryItemIndex <= 0) {
            return;
        }

        if (hasChangedDuringUndo) {
            const prevHistoryItemId = getHistoryItemId(previousHistoryItemIndex);

            return setHistoryItem(prevHistoryItemId, prevHistoryItemId);
        }

        const prevHistoryItemId = getHistoryItemId(currentHistoryItemIndex - 1);

        setHistoryItem(prevHistoryItemId);

        setCanResetWidgets(true);
    }, [currentHistoryItem?.order, getHistoryItemId, previousHistoryItem?.order, setHistoryItem]);

    const setNextHistoryItem = useCallback(() => {
        const currentHistoryItemIndex = currentHistoryItem?.order;
        const previousHistoryItemIndex = previousHistoryItem?.order;
        const hasChangedDuringUndo =
            previousHistoryItemIndex &&
            currentHistoryItemIndex &&
            (currentHistoryItemIndex - previousHistoryItemIndex < -1 ||
                currentHistoryItemIndex - previousHistoryItemIndex > 1);

        if (!currentHistoryItemIndex || currentHistoryItemIndex <= 0) {
            return;
        }

        if (hasChangedDuringUndo) {
            const prevHistoryItemId = getHistoryItemId(previousHistoryItemIndex);

            return setHistoryItem(prevHistoryItemId, prevHistoryItemId);
        }

        const nextHistoryItemId = getHistoryItemId(currentHistoryItemIndex + 1);

        setHistoryItem(nextHistoryItemId);
        setCanResetWidgets(true);
    }, [currentHistoryItem?.order, getHistoryItemId, previousHistoryItem?.order, setHistoryItem]);

    return {
        historyDictionary,
        getHistoryItemById,
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
        widgetsIdsOrderChanged,
    };
};
