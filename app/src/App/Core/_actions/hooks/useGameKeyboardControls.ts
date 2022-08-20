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
    const { selectedWidgets, firstCurrentWidget, widgets, removeselectedWidgets, copyWidget } =
        useWidgets();
    const [, setCopiedWidgets] = useState<WidgetSceneObject[]>([]);

    useKeyboardMappings(
        (keyMapping: KeyboardMappings) => {
            if (keyMapping.editor.toggleEditor?.value) {
                setIsEditor();
            } else if (keyMapping.editor.copyWidget?.value) {
                if (selectedWidgets.length > 0) {
                    setCopiedWidgets(selectedWidgets);
                }
            } else if (keyMapping.editor.pasteWidget?.value) {
                if (selectedWidgets.length > 0) {
                    selectedWidgets.forEach((x) => {
                        copyWidget(x);
                    });
                }
            } else if (keyMapping.editor.deleteWidget?.value) {
                if (selectedWidgets.length > 0) {
                    removeselectedWidgets();
                }
            } else if (keyMapping.editor.nextCamera?.value) {
                setNextCamera();
            } else if (keyMapping.editor.prevCamera?.value) {
                setPrevCamera();
            }
        },
        [firstCurrentWidget?.id, selectedWidgets, widgets, copyWidget, removeselectedWidgets]
    );
};
