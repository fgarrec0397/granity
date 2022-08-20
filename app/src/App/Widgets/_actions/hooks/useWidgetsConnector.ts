import { events } from "@app/Core/_actions/utilities";
import { useEffect } from "react";

import useGetMeshByWidget from "./useGetMeshByWidget";
import useWidgets from "./useWidgets";

export default () => {
    const getMeshByWidget = useGetMeshByWidget();
    const { selectedWidgets, updateCurrentWidgetWithMesh } = useWidgets();

    useEffect(() => {
        const handleUpdateCurrentWidgetWithMesh = ({ detail }: CustomEvent) => {
            if (selectedWidgets.length) {
                const mesh = getMeshByWidget(selectedWidgets[0]);
                updateCurrentWidgetWithMesh(mesh, detail?.updateOnlyProperties);
            }
        };

        events.on("updateCurrentWidgetWithMesh", handleUpdateCurrentWidgetWithMesh);

        return () => {
            events.off("updateCurrentWidgetWithMesh", handleUpdateCurrentWidgetWithMesh);
        };
    }, [selectedWidgets, getMeshByWidget, updateCurrentWidgetWithMesh]);
};
