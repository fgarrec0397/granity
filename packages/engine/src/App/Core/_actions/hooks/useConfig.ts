import defaultKeyboardMappings from "@engine/App/Core/configs/keyboardMappings";
import { useCallback } from "react";

import useConfigService from "../_data/hooks/useConfigService";
import { EngineConfig, KeyboardKeys } from "../coreTypes";
import overrideKeyboardMapping from "../utilities/overrideKeyboardMapping";

export default () => {
    const {
        updateKeyboardMappings,
        endpoints,
        keyboardMappings,
        editorMainMenu,
        updateEditorMainMenu,
        updateEndpoints,
    } = useConfigService();

    const initEndpoints = useCallback(
        (newEndpoints: EngineConfig["endpoints"]) => {
            updateEndpoints(newEndpoints);
        },
        [updateEndpoints]
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
        endpoints,
        keyboardMappings,
        initKeyboardMappings,
        initMainMenu,
        editorMainMenu,
        initEndpoints,
    };
};
