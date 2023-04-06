import defaultKeyboardMappings from "@engine/App/Core/configs/keyboardMappings";
import { merge } from "@granity/helpers";
import { useCallback } from "react";

import useConfigService from "../_data/hooks/useConfigService";
import { ConfigContexEndpoints, defaultEnpoints } from "../_data/providers/ConfigContextProvider";
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
            const mergedEndpoints: ConfigContexEndpoints = merge(defaultEnpoints, newEndpoints);
            updateEndpoints(mergedEndpoints);
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
