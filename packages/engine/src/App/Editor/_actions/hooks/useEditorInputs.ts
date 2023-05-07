import { ClientKeyMappings } from "@engine/App/Core/_actions/coreTypes";
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
    const { selectedWidgets, firstCurrentWidget, widgets, removeselectedWidgets, copyWidget } =
        useWidgets();
    const { toggleGrid } = useEditor();
    const { setPrevHistoryItem, setNextHistoryItem, shouldAddHistoryState } = useHistory();
    const [, setCopiedWidgets] = useState<WidgetDictionaryItem[]>([]);
    const { runGamePreview } = useGame();
    const { saveApp } = useCore();

    useInputs(
        (keyMapping: ClientKeyMappings) => {
            if (keyMapping.toggleEditor) {
                runGamePreview();
            } else if (keyMapping.toggleGrid) {
                toggleGrid();
            } else if (keyMapping.copyWidget) {
                if (selectedWidgets.length > 0) {
                    setCopiedWidgets(selectedWidgets);
                }
            } else if (keyMapping.pasteWidget) {
                if (selectedWidgets.length > 0) {
                    selectedWidgets.forEach((x) => {
                        copyWidget(x);
                    });
                }
            } else if (keyMapping.undo) {
                setPrevHistoryItem();
            } else if (keyMapping.cancelUndo) {
                setNextHistoryItem();
            } else if (keyMapping.delete) {
                if (selectedWidgets.length > 0) {
                    removeselectedWidgets();
                }
            } else if (keyMapping.nextCamera) {
                setNextCamera();
            } else if (keyMapping.prevCamera) {
                setPrevCamera();
            } else if (keyMapping.saveApp) {
                saveApp();
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
