import useCore from "@engine/App/Core/_actions/hooks/useCore";
import useWidgets from "@engine/App/Widgets/_actions/hooks/useWidgets";
import { usePrevious } from "@granity/helpers";
import { useEffect } from "react";

import useHistory from "./useHistory";

export default () => {
    const { widgets, widgetsInfoDictionary, widgetsIds, resetWidgets } = useWidgets();
    const {
        addHistoryState,
        currentHistoryItem,
        setShouldAddHistoryState,
        shouldResetWidgets,
        editorStateChanged,
        shouldUpdateAppStatus,
        isCurrentHistoryItemIsSaved,
        isCurrentHistoryItemIsPublished,
        widgetsChanged,
    } = useHistory();
    const { app, updateApp } = useCore();
    const previousCurrentHistoryItem = usePrevious(currentHistoryItem);

    useEffect(() => {
        const beforeUnloadHanlder = (event: BeforeUnloadEvent) => {
            if (app?.status === "pending") {
                event.preventDefault();
                return (event.returnValue = "");
            }
        };

        window.addEventListener("beforeunload", beforeUnloadHanlder);

        return () => {
            window.removeEventListener("beforeunload", beforeUnloadHanlder);
        };
    }, [app?.status]);

    useEffect(() => {
        if (widgetsChanged && app?.status === "pending") {
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
    }, [
        app,
        isCurrentHistoryItemIsPublished,
        isCurrentHistoryItemIsSaved,
        widgetsChanged,
        updateApp,
    ]);

    useEffect(() => {
        if (editorStateChanged) {
            addHistoryState({
                widgets,
                widgetsInfoDictionary,
                widgetsIds,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [addHistoryState, editorStateChanged, widgets, widgetsInfoDictionary]);

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
                currentHistoryItem!.state.widgetsInfoDictionary,
                currentHistoryItem!.state.widgetsIds
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
