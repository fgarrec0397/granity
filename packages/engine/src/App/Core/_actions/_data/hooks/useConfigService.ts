import { useCallback } from "react";

import { EngineConfig, KeyboardKeys } from "../../coreTypes";
import useConfigContext from "./useConfigContext";

export default () => {
    const {
        keyboardMappings,
        editorMainMenu,
        endpoints,
        setKeyboardMappings,
        setEditorMainMenu,
        setEndpoints,
    } = useConfigContext();

    const updateEndpoints = useCallback(
        (newEndpoints: EngineConfig["endpoints"]) => {
            setEndpoints(newEndpoints);
        },
        [setEndpoints]
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
        endpoints,
        keyboardMappings,
        editorMainMenu,
        updateEndpoints,
        updateKeyboardMappings,
        updateEditorMainMenu,
    };
};
