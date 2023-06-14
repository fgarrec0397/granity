import useCore from "@engine/App/Core/_actions/hooks/useCore";
import useWidgets from "@engine/App/Widgets/_actions/hooks/useWidgets";
import { useEffect } from "react";

import useHistory from "./useHistory";

export default () => {
    const { widgets, widgetsInfoDictionary, widgetsIds } = useWidgets();
    const {
        addHistoryState,
        editorStateChanged,
        shouldUpdateAppStatus,
        isCurrentHistoryItemIsSaved,
        isCurrentHistoryItemIsPublished,
        widgetsChanged,
    } = useHistory();
    const { app, updateApp } = useCore();

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
    }, [addHistoryState, editorStateChanged, widgets, widgetsIds, widgetsInfoDictionary]);

    useEffect(() => {
        if (shouldUpdateAppStatus) {
            updateApp({
                ...app,
                status: "pending",
            });
        }
    }, [app, shouldUpdateAppStatus, updateApp]);
};
