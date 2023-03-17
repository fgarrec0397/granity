import { useCallback } from "react";

import { EngineConfig, KeyboardKeys } from "../../coreTypes";
import { CoreAction } from "../providers";
import useCoreContext from "./useCoreContext";

export default () => {
    const {
        reducer: [state, dispatch],
        keyboardMappings,
        setKeyboardMappings,
        editorMainMenu,
        setEditorMainMenu,
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

    const updateEditorMainMenu = useCallback(
        (newEditorMainMenu: EngineConfig["editorMainMenu"]) => {
            setEditorMainMenu(newEditorMainMenu);
        },
        [setEditorMainMenu]
    );

    return {
        onSave: state.onSave,
        updateOnSave,
        updateKeyboardMappings,
        keyboardMappings,
        updateEditorMainMenu,
        editorMainMenu,
    };
};
