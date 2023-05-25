import { GameWidgetProperties } from "@engine/App/Game/_actions/gameTypes";
import { useCallback } from "react";

import useUIDispatch from "./useUIDispatch";
import useUISelector from "./useUISelector";

export default () => {
    const { dispatchSetSelectedWidgetProperties } = useUIDispatch();
    const { selectedWidgetProperties } = useUISelector();

    const setSelectedWidgetProperties = useCallback(
        (properties: GameWidgetProperties) => {
            dispatchSetSelectedWidgetProperties(properties);
        },
        [dispatchSetSelectedWidgetProperties]
    );

    return {
        selectedWidgetProperties,
        setSelectedWidgetProperties,
    };
};
