import { useCallback } from "react";

import { EngineConfig } from "../../coreTypes";
import { CoreAction } from "../providers";
import useCoreContext from "./useCoreContext";

export default () => {
    const [state, dispatch] = useCoreContext();

    const updateOnSave = useCallback(
        (onSaveCallback: EngineConfig["onSave"]) => {
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
