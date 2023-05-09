import defaultInputsConfig from "@engine/App/Core/configs/inputsConfig";
import { merge } from "@granity/helpers";
import { useCallback } from "react";

import useConfigService from "../_data/hooks/useConfigService";
import { ConfigContextEndpoints, defaultEnpoints } from "../_data/providers/ConfigContextProvider";
import { EngineConfig, InputsConfig } from "../coreTypes";
import overrideInputsConfig from "../utilities/overrideInputsConfig";

export default () => {
    const {
        updateInputsConfig,
        endpoints,
        inputsConfig,
        editorMainMenu,
        updateEditorMainMenu,
        updateEndpoints,
    } = useConfigService();

    const initEndpoints = useCallback(
        (newEndpoints: EngineConfig["endpoints"]) => {
            const mergedEndpoints: ConfigContextEndpoints = merge(defaultEnpoints, newEndpoints);
            updateEndpoints(mergedEndpoints);
        },
        [updateEndpoints]
    );

    const initInputsConfig = useCallback(
        (newInputsConfig: InputsConfig) => {
            const overridedInputs = overrideInputsConfig(defaultInputsConfig, newInputsConfig);

            updateInputsConfig(overridedInputs);
        },
        [updateInputsConfig]
    );

    const initMainMenu = useCallback(
        (newEditorMainMenu: EngineConfig["editorMainMenu"]) => {
            updateEditorMainMenu(newEditorMainMenu);
        },
        [updateEditorMainMenu]
    );

    return {
        endpoints,
        inputsConfig,
        initInputsConfig,
        initMainMenu,
        editorMainMenu,
        initEndpoints,
    };
};
