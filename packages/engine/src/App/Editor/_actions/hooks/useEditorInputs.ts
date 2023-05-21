import useCore from "@engine/App/Core/_actions/hooks/useCore";
import useInputs from "@engine/App/Core/_actions/hooks/useInputs";
import useHistory from "@engine/App/Editor/_actions/hooks/useHistory";
import useGame from "@engine/App/Game/_actions/hooks/useGame";
import useCameras from "@engine/App/Scenes/_actions/hooks/useCameras";
import useWidgets from "@engine/App/Widgets/_actions/hooks/useWidgets";
import { WidgetDictionaryItem } from "@engine/App/Widgets/_actions/widgetsTypes";
import { useState } from "react";

import useEditor from "./useEditor";

export default () => {
    const { setNextCamera, setPrevCamera } = useCameras();
    const {
        selectedWidgets,
        firstCurrentWidget,
        widgets,
        removeselectedWidgets,
        removeWidgetSelection,
        copyWidget,
    } = useWidgets();
    const { toggleDebug } = useEditor();
    const { setPrevHistoryItem, setNextHistoryItem, shouldAddHistoryState } = useHistory();
    const [, setCopiedWidgets] = useState<WidgetDictionaryItem[]>([]);
    const { runGamePreview } = useGame();
    const { saveApp } = useCore();

    useInputs(
        (input) => {
            if (input.toggleEditor) {
                runGamePreview();
            } else if (input.toggleDebug) {
                toggleDebug();
            } else if (input.copyWidget) {
                if (selectedWidgets.length > 0) {
                    setCopiedWidgets(selectedWidgets);
                }
            } else if (input.pasteWidget) {
                if (selectedWidgets.length > 0) {
                    selectedWidgets.forEach((x) => {
                        copyWidget(x);
                    });
                }
            } else if (input.undo) {
                setPrevHistoryItem();
            } else if (input.cancelUndo) {
                setNextHistoryItem();
            } else if (input.delete) {
                if (selectedWidgets.length > 0) {
                    removeselectedWidgets();
                }
            } else if (input.nextCamera) {
                setNextCamera();
            } else if (input.prevCamera) {
                setPrevCamera();
            } else if (input.saveApp) {
                saveApp();
            } else if (input.unselect) {
                removeWidgetSelection();
            }
        },
        [
            firstCurrentWidget?.id,
            selectedWidgets,
            widgets,
            copyWidget,
            removeselectedWidgets,
            shouldAddHistoryState,
            saveApp,
        ]
    );
};
