import { useEffect } from "react";
import { off, on } from "../../../Core/utils/events";
import { WidgetBaseOptions } from "../../types";
import useWidgetsActions from "./useWidgetsActions";

// type Parameter = {
//     value: string;
//     option: WidgetBaseOptions;
// };

export default () => {
    const { updateCurrentWidgetOptions } = useWidgetsActions();

    useEffect(() => {
        const handleUpdateCurrentWidgetOptions = ({ detail }: CustomEvent) => {
            console.log(detail, "detail");

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
