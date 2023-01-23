import { ClientKeyMappings } from "@granity-engine/App/Core/_actions/coreTypes";
import useKeyboardMapping from "@granity-engine/App/Core/_actions/hooks/useKeyboardMapping";
import useHistory from "@granity-engine/App/Editor/_actions/hooks/useHistory";
import useGame from "@granity-engine/App/Game/_actions/hooks/useGame";
import useCameras from "@granity-engine/App/Scenes/_actions/hooks/useCameras";
import useScenes from "@granity-engine/App/Scenes/_actions/hooks/useScenes";
import useWidgets from "@granity-engine/App/Widgets/_actions/hooks/useWidgets";
import { WidgetDictionaryItem } from "@granity-engine/App/Widgets/_actions/widgetsTypes";
import { useState } from "react";

export default () => {
    const { setNextCamera, setPrevCamera } = useCameras();
    const { selectedWidgets, firstCurrentWidget, widgets, removeselectedWidgets, copyWidget } =
        useWidgets();
    const { setPrevHistoryItem, setNextHistoryItem, shouldAddHistoryState } = useHistory();
    const [, setCopiedWidgets] = useState<WidgetDictionaryItem[]>([]);
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
