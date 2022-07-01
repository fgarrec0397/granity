import { events } from "@core/utilities";
import { useEffect } from "react";

import useGetWidgets from "./useGetWidgets";
import useWidgets from "./useWidgets";
import useWidgetsActions from "./useWidgetsActions";

export default () => {
    const { updateCurrentWidgetOptions, updateCurrentWidgetWithMesh } = useWidgetsActions();
    const { getMeshByWidget } = useGetWidgets();
    const { currentWidgets } = useWidgets();

    useEffect(() => {
        const handleUpdateCurrentWidgetOptions = ({ detail }: CustomEvent) => {
            updateCurrentWidgetOptions({
                [detail.option.name]: {
                    fieldType: detail.option.fieldType,
                    value: detail.value,
                },
            });
        };

        events.on("updateCurrentWidgetOptions", handleUpdateCurrentWidgetOptions);

        return () => {
            events.off("updateCurrentWidgetOptions", handleUpdateCurrentWidgetOptions);
        };
    }, [updateCurrentWidgetOptions]);

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
