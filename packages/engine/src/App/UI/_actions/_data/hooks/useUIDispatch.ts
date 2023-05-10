import { useAppDispatch } from "@engine/api";
import { WidgetProperties } from "@engine/App/Widgets/_actions/widgetsTypes";
import { useCallback } from "react";

import { setSelectedWidgetProperties } from "../state/uiReducer";

export default () => {
    const dispatch = useAppDispatch();

    const dispatchSetSelectedWidgetProperties = useCallback(
        (properties: WidgetProperties) => {
            dispatch(setSelectedWidgetProperties(properties));
        },
        [dispatch]
    );

    return {
        dispatchSetSelectedWidgetProperties,
    };
};
