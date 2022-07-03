import { KeyboardMappings } from "@app/Core/coreTypes";
import useHandleEditor from "@app/Editor/_actions/hooks/useHandleEditor";
import useCameras from "@scene/_actions/hooks/useCameras";
import useWidgets from "@widgets/_actions/hooks/useWidgets";
import useWidgetsActions from "@widgets/_actions/hooks/useWidgetsActions";
import { WidgetSceneObject } from "@widgets/_actions/widgetsTypes";
import { useEffect, useState } from "react";

import useKeyboardMappings from "./useKeyboardMappings";

export default () => {
    const { setNextCamera, setPrevCamera } = useCameras();
    const { removeCurrentWidgets, copyWidget } = useWidgetsActions();
    const { currentWidgets, firstCurrentWidget, widgets } = useWidgets();
    const [, setCopiedWidgets] = useState<WidgetSceneObject[]>([]);

    useHandleEditor();

    useKeyboardMappings(
        (keyMapping: KeyboardMappings) => {
            return (event: KeyboardEvent) => {
                if (keyMapping.editor.copyWidget(event)) {
                    console.log("copy");

                    if (currentWidgets.length > 0) {
                        setCopiedWidgets(currentWidgets);
                    }
                } else if (event.ctrlKey && event.code === "KeyV") {
                    console.log("paste");

                    if (currentWidgets.length > 0) {
                        currentWidgets.forEach((x) => {
                            copyWidget(x);
                        });
                    }
                } else if (event.code === "Delete") {
                    if (currentWidgets.length > 0) {
                        removeCurrentWidgets();
                    }
                }
            };
        },
        [firstCurrentWidget?.id, currentWidgets, widgets, copyWidget, removeCurrentWidgets]
    );

    useEffect(() => {
        const handleKeyUp = (event: KeyboardEvent) => {
            if (event.ctrlKey && event.code === "ArrowRight") {
                setNextCamera();
            }

            if (event.ctrlKey && event.code === "ArrowLeft") {
                setPrevCamera();
            }
        };

        window.addEventListener("keyup", handleKeyUp);

        return () => {
            window.removeEventListener("keyup", handleKeyUp);
        };
    });
};
