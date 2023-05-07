import { useAppDispatch } from "@engine/api";
import { WidgetProperties } from "@engine/App/Widgets/_actions/widgetsTypes";

import { setSelectedWidgetProperties } from "../state/uiReducer";

export default () => {
    const dispatch = useAppDispatch();

    const dispatchSetSelectedWidgetProperties = (properties: WidgetProperties) => {
        dispatch(setSelectedWidgetProperties(properties));
    };

    return {
        dispatchSetSelectedWidgetProperties,
    };
};
