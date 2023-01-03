import { ClientKeyMappings } from "@app/Core/_actions/coreTypes";
import useKeyboardMapping from "@app/Core/_actions/hooks/useKeyboardMapping";
import useHistory from "@app/Editor/_actions/hooks/useHistory";
import useGame from "@app/Game/_actions/hooks/useGame";
import useCameras from "@app/Scenes/_actions/hooks/useCameras";
import useScenes from "@app/Scenes/_actions/hooks/useScenes";
import useWidgets from "@app/Widgets/_actions/hooks/useWidgets";
import { WidgetObjectsDictionaryItem } from "@app/Widgets/_actions/widgetsTypes";
import { useState } from "react";

export default () => {
    const { setNextCamera, setPrevCamera } = useCameras();
    const { selectedWidgets, firstCurrentWidget, widgets, removeselectedWidgets, copyWidget } =
        useWidgets();
    const { setPrevHistoryItem, setNextHistoryItem, shouldAddHistoryState } = useHistory();
    const [, setCopiedWidgets] = useState<WidgetObjectsDictionaryItem[]>([]);
    const { startGame } = useGame();
    const { saveScene } = useScenes();

    useKeyboardMapping(
        (keyMapping: ClientKeyMappings) => {
            if (keyMapping.toggleEditor) {
                startGame();
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
            } else if (keyMapping.deleteWidget) {
                if (selectedWidgets.length > 0) {
                    removeselectedWidgets();
                }
            } else if (keyMapping.nextCamera) {
                setNextCamera();
            } else if (keyMapping.prevCamera) {
                setPrevCamera();
            } else if (keyMapping.saveScene) {
                saveScene();
            }
        },
        [
            firstCurrentWidget?.id,
            selectedWidgets,
            widgets,
            copyWidget,
            removeselectedWidgets,
            shouldAddHistoryState,
            saveScene,
        ]
    );
};
