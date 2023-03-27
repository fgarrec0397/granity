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
                payload: { onSave: onSaveCallback },
            });
        },
        [dispatch]
    );

    const updateGetFiles = useCallback(
        (getFilesCallback: EngineConfig["getFiles"]) => {
            dispatch({
                type: CoreAction.GET_FILES,
                payload: { getFiles: getFilesCallback },
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
        getFiles: state.getFiles,
        updateOnSave,
        updateGetFiles,
        updateKeyboardMappings,
        keyboardMappings,
        updateEditorMainMenu,
        editorMainMenu,
    };
};
