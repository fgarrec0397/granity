import { WidgetProperties } from "@engine/App/Widgets/_actions/widgetsTypes";
import { useCallback } from "react";

import useUIDispatch from "./useUIDispatch";
import useUISelector from "./useUISelector";

export default () => {
    const { dispatchSetSelectedWidgetProperties } = useUIDispatch();
    const { selectedWidgetProperties } = useUISelector();

    const setSelectedWidgetProperties = useCallback(
        (properties: WidgetProperties) => {
            dispatchSetSelectedWidgetProperties(properties);
        },
        [dispatchSetSelectedWidgetProperties]
    );

    return {
        selectedWidgetProperties,
        setSelectedWidgetProperties,
    };
};
