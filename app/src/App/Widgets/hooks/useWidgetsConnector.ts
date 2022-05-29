import { useEffect } from "react";
import { off, on } from "../../Core/utils/events";
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

        on("updateCurrentWidgetOptions", handleUpdateCurrentWidgetOptions);

        return () => {
            off("updateCurrentWidgetOptions", handleUpdateCurrentWidgetOptions);
        };
    }, [updateCurrentWidgetOptions]);
};
