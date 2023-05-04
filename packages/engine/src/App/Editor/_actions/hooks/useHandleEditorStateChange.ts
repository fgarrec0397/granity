import useCore from "@engine/App/Core/_actions/hooks/useCore";
import useWidgets from "@engine/App/Widgets/_actions/hooks/useWidgets";
import { usePrevious } from "@granity/helpers";
import { useEffect } from "react";

import useHistory from "./useHistory";

export default () => {
    const { widgets, widgetsObjectInfoDictionary, resetWidgets } = useWidgets();
    const {
        addHistoryState,
        currentHistoryItem,
        setShouldAddHistoryState,
        shouldResetWidgets,
        editorStateChanged,
        shouldUpdateAppStatus,
        isCurrentHistoryItemIsSaved,
        isCurrentHistoryItemIsPublished,
        test,
    } = useHistory();
    const { app, updateApp } = useCore();
    const previousCurrentHistoryItem = usePrevious(currentHistoryItem);

    useEffect(() => {
        console.log({ isCurrentHistoryItemIsSaved, isCurrentHistoryItemIsPublished });

        if (test && app?.status === "pending") {
            if (isCurrentHistoryItemIsSaved) {
                updateApp({
                    ...app,
                    status: "saved",
                });
            }

            if (isCurrentHistoryItemIsPublished) {
                updateApp({
                    ...app,
                    status: "published",
                });
            }
        }
    }, [app, isCurrentHistoryItemIsPublished, isCurrentHistoryItemIsSaved, test, updateApp]);

    useEffect(() => {
        if (editorStateChanged) {
            addHistoryState({
                widgets,
                widgetsObjectInfoDictionary,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [addHistoryState, editorStateChanged, widgets, widgetsObjectInfoDictionary]);

    useEffect(() => {
        if (shouldUpdateAppStatus) {
            updateApp({
                ...app,
                status: "pending",
            });
        }
    }, [app, shouldUpdateAppStatus, updateApp]);

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
