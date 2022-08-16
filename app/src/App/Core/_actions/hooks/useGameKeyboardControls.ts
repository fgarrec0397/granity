import { KeyboardMappings } from "@app/Core/coreTypes";
import { useIsEditor } from "@app/Editor/_actions/hooks";
import useCameras from "@scene/_actions/hooks/useCameras";
import useWidgets from "@widgets/_actions/hooks/useWidgets";
import { WidgetSceneObject } from "@widgets/_actions/widgetsTypes";
import { useState } from "react";

import useKeyboardMappings from "./useKeyboardMappings";

export default () => {
    const { setIsEditor } = useIsEditor();
    const { setNextCamera, setPrevCamera } = useCameras();
    const { currentWidgets, firstCurrentWidget, widgets, removeCurrentWidgets, copyWidget } =
        useWidgets();
    const [, setCopiedWidgets] = useState<WidgetSceneObject[]>([]);

    useKeyboardMappings(
        (keyMapping: KeyboardMappings) => {
            if (keyMapping.editor.toggleEditor?.value) {
                setIsEditor();
            } else if (keyMapping.editor.copyWidget?.value) {
                if (currentWidgets.length > 0) {
                    setCopiedWidgets(currentWidgets);
                }
            } else if (keyMapping.editor.pasteWidget?.value) {
                if (currentWidgets.length > 0) {
                    currentWidgets.forEach((x) => {
                        copyWidget(x);
                    });
                }
            } else if (keyMapping.editor.deleteWidget?.value) {
                if (currentWidgets.length > 0) {
                    removeCurrentWidgets();
                }
            } else if (keyMapping.editor.nextCamera?.value) {
                setNextCamera();
            } else if (keyMapping.editor.prevCamera?.value) {
                setPrevCamera();
            }
        },
        [firstCurrentWidget?.id, currentWidgets, widgets, copyWidget, removeCurrentWidgets]
    );
};
