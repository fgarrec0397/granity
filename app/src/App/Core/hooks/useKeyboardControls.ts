import { useEffect, useState } from "react";
import useHandleEditor from "../../Editor/state/hooks/useHandleEditor";
import useWidgets from "../../Widgets/state/hooks/useWidgets";
import { WidgetSceneObject } from "../../Widgets/types";

export default () => {
    const { currentWidgets, firstCurrentWidget, removeCurrentWidgets, copyWidget, widgets } =
        useWidgets();
    // const {  } = useSceneWidgets();
    const [, setCopiedWidgets] = useState<WidgetSceneObject[]>([]);

    useHandleEditor();

    useEffect(() => {
        const handleKeyUp = (event: KeyboardEvent): void => {
            if (event.ctrlKey && event.code === "KeyC") {
                if (currentWidgets.length > 0) {
                    setCopiedWidgets(currentWidgets);
                }
            } else if (event.ctrlKey && event.code === "KeyV") {
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

        window.addEventListener("keyup", handleKeyUp);

        return () => {
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, [firstCurrentWidget?.id, currentWidgets, widgets, copyWidget, removeCurrentWidgets]);
};
