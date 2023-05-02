import { useScenes } from "@engine/api";
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
        shouldAddHistory,
    } = useHistory();
    const { scenesStatus } = useScenes();
    const { appStatus, app, updateApp } = useCore();
    const previousCurrentHistoryItem = usePrevious(currentHistoryItem);

    useEffect(() => {
        if (shouldAddHistory && scenesStatus === "success") {
            // TODO should add history only when widgets have been loaded
            console.log({ scenesStatus, appStatus }, "changed");

            addHistoryState({
                widgets,
                widgetsObjectInfoDictionary,
            });

            updateApp({
                ...app,
                status: "pending",
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        addHistoryState,
        // app,
        // appStatus,
        shouldAddHistory,
        // updateApp,
        widgets,
        widgetsObjectInfoDictionary,
    ]);

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
