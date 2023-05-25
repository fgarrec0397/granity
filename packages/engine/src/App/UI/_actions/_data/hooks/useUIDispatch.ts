import { useAppDispatch } from "@engine/api";
import { GameWidgetProperties } from "@engine/App/Game/_actions/gameTypes";
import { useCallback } from "react";

import { setSelectedWidgetProperties } from "../state/uiReducer";

export default () => {
    const dispatch = useAppDispatch();

    const dispatchSetSelectedWidgetProperties = useCallback(
        (properties: GameWidgetProperties) => {
            dispatch(setSelectedWidgetProperties(properties));
        },
        [dispatch]
    );

    return {
        dispatchSetSelectedWidgetProperties,
    };
};
