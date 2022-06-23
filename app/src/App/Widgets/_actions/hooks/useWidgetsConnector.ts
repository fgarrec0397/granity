import { events } from "@core/utilities";
import { useEffect } from "react";

import useWidgetsActions from "./useWidgetsActions";

export default () => {
    const { updateCurrentWidgetOptions } = useWidgetsActions();

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
};
