import { useEffect, useState } from "react";
import useHandleEditor from "../../Editor/state/hooks/useHandleEditor";
import useSceneWidgets from "../../Widgets/state/hooks/useSceneWidgets";
import useWidgets from "../../Widgets/state/hooks/useWidgets";
import { WidgetSceneObject } from "../../Widgets/types";

export default () => {
    const { currentWidgets, widgets } = useWidgets();
    const { removeCurrentWidgets, copyWidget } = useSceneWidgets();
    const [copiedWidgets, setCopiedWidgets] = useState<WidgetSceneObject[]>([]);

    useHandleEditor();

    useEffect(() => {
        window.addEventListener("keyup", handleKeyUp);

        return () => {
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, [currentWidgets.length, currentWidgets[0]?.id, currentWidgets, widgets]);

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
                console.log("delete");
                // removeCurrentObjects();
                removeCurrentWidgets();
                // removeWidget();
            }
        }
    };
};
