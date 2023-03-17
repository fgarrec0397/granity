import { useCallback } from "react";

import { EngineConfig, KeyboardKeys } from "../../coreTypes";
import { CoreAction } from "../providers";
import useCoreContext from "./useCoreContext";

export default () => {
    const {
        reducer: [state, dispatch],
        keyboardMappings,
        setKeyboardMappings,
        mainMenu,
        setMainMenu,
    } = useCoreContext();

    const updateOnSave = useCallback(
        (onSaveCallback: EngineConfig["onSave"]) => {
            dispatch({
                type: CoreAction.ON_SAVE,
                payload: onSaveCallback,
            });
        },
        [dispatch]
    );

    const updateKeyboardMappings = useCallback(
        (newKeyboardMappings: KeyboardKeys) => {
            setKeyboardMappings(newKeyboardMappings);
        },
        [setKeyboardMappings]
    );

    const updateMainMenu = useCallback(
        (newMainMenu: EngineConfig["mainMenu"]) => {
            setMainMenu(newMainMenu);
        },
        [setMainMenu]
    );

    return {
        onSave: state.onSave,
        updateOnSave,
        updateKeyboardMappings,
        keyboardMappings,
        updateMainMenu,
        mainMenu,
    };
};
