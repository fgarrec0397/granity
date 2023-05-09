import { useCallback } from "react";

import { EngineConfig, InputsConfig } from "../../coreTypes";
import { ConfigContextEndpoints } from "../providers/ConfigContextProvider";
import useConfigContext from "./useConfigContext";

export default () => {
    const {
        inputsConfig,
        editorMainMenu,
        endpoints,
        setInputsConfig,
        setEditorMainMenu,
        setEndpoints,
    } = useConfigContext();

    const updateEndpoints = useCallback(
        (newEndpoints: ConfigContextEndpoints) => {
            setEndpoints(newEndpoints);
        },
        [setEndpoints]
    );

    const updateInputsConfig = useCallback(
        (newInputsConfig: InputsConfig) => {
            setInputsConfig(newInputsConfig);
        },
        [setInputsConfig]
    );

    const updateEditorMainMenu = useCallback(
        (newEditorMainMenu: EngineConfig["editorMainMenu"]) => {
            setEditorMainMenu(newEditorMainMenu);
        },
        [setEditorMainMenu]
    );

    return {
        endpoints,
        inputsConfig,
        editorMainMenu,
        updateEndpoints,
        updateInputsConfig,
        updateEditorMainMenu,
    };
};
