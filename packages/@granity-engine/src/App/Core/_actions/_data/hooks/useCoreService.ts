import { useCallback } from "react";

import { EngineOptions } from "../../coreTypes";
import { CoreAction } from "../providers";
import useCoreContext from "./useCoreContext";

export default () => {
    const [state, dispatch] = useCoreContext();

    const updateOnSave = useCallback(
        (onSaveCallback: EngineOptions["onSave"]) => {
            dispatch({
                type: CoreAction.ON_SAVE,
                payload: onSaveCallback,
            });
        },
        [dispatch]
    );

    return {
        onSave: state.onSave,
        updateOnSave,
    };
};
