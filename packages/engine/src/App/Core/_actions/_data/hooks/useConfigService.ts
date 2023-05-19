import { useCallback } from "react";

import { EngineConfig, InputsConfig } from "../../coreTypes";
import {
    ConfigContextEndpoints,
    ConfigContextPhysicsEnabled,
} from "../providers/ConfigContextProvider";
import useConfigContext from "./useConfigContext";

export default () => {
    const {
        inputsConfig,
        editorMainMenu,
        endpoints,
        physicsEnabled,
        setInputsConfig,
        setEditorMainMenu,
        setEndpoints,
        setPhysicsEnabled,
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

    const updatePhysicsEnabled = useCallback(
        (value: ConfigContextPhysicsEnabled) => {
            setPhysicsEnabled(value);
        },
        [setPhysicsEnabled]
    );

    return {
        endpoints,
        inputsConfig,
        editorMainMenu,
        physicsEnabled,
        updateEndpoints,
        updateInputsConfig,
        updateEditorMainMenu,
        updatePhysicsEnabled,
    };
};
