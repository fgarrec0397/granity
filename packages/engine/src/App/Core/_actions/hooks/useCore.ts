import defaultKeyboardMappings from "@engine/App/Core/configs/keyboardMappings";
import useEditor from "@engine/App/Editor/_actions/hooks/useEditor";
import { useCallback } from "react";

import useCoreService from "../_data/hooks/useCoreService";
import { EngineConfig, KeyboardKeys } from "../coreTypes";
import overrideKeyboardMapping from "../utilities/overrideKeyboardMapping";

export default () => {
    const { onEditorPointerMissed, isEditor } = useEditor();
    const {
        onSave,
        updateOnSave,
        updateKeyboardMappings,
        keyboardMappings,
        editorMainMenu,
        updateEditorMainMenu,
    } = useCoreService();

    const onCorePointerMissed = useCallback(
        (event: MouseEvent) => {
            if (isEditor) {
                onEditorPointerMissed(event);
            }
        },
        [isEditor, onEditorPointerMissed]
    );

    const initOnSave = useCallback(
        (onSaveCallback: EngineConfig["onSave"]) => {
            updateOnSave(onSaveCallback);
        },
        [updateOnSave]
    );

    const initKeyboardMappings = useCallback(
        (newKeyboardMappings: KeyboardKeys) => {
            const overridedMappings = overrideKeyboardMapping(
                defaultKeyboardMappings,
                newKeyboardMappings
            );

            updateKeyboardMappings(overridedMappings);
        },
        [updateKeyboardMappings]
    );

    const initMainMenu = useCallback(
        (newEditorMainMenu: EngineConfig["editorMainMenu"]) => {
            updateEditorMainMenu(newEditorMainMenu);
        },
        [updateEditorMainMenu]
    );

    return {
        keyboardMappings,
        onCorePointerMissed,
        onSave,
        initOnSave,
        initKeyboardMappings,
        initMainMenu,
        editorMainMenu,
    };
};
