import { events } from "@app/Core/_actions/utilities";
import { useEffect } from "react";

import useGetMeshByWidget from "./useGetMeshByWidget";
import useWidgets from "./useWidgets";

export default () => {
    const getMeshByWidget = useGetMeshByWidget();
    const { currentWidgets, updateCurrentWidgetWithMesh } = useWidgets();

    useEffect(() => {
        const handleUpdateCurrentWidgetWithMesh = ({ detail }: CustomEvent) => {
            if (currentWidgets.length) {
                const mesh = getMeshByWidget(currentWidgets[0]);
                updateCurrentWidgetWithMesh(mesh, detail?.updateOnlyProperties);
            }
        };

        events.on("updateCurrentWidgetWithMesh", handleUpdateCurrentWidgetWithMesh);

        return () => {
            events.off("updateCurrentWidgetWithMesh", handleUpdateCurrentWidgetWithMesh);
        };
    }, [currentWidgets, getMeshByWidget, updateCurrentWidgetWithMesh]);
};
