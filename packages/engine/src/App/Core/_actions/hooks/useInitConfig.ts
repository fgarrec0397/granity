import { useWidgetsModules } from "@engine/api";
import { useEffect } from "react";

import { EngineConfig } from "../coreTypes";
import useConfig from "./useConfig";

export default (config: EngineConfig) => {
    const { initWidgetsModules } = useWidgetsModules();
    const { initInputsConfig, initMainMenu, initEndpoints, initPhysicsEnabled } = useConfig();

    useEffect(() => {
        if (config.widgetsModules) {
            initWidgetsModules(config.widgetsModules);
        }
    }, [config?.widgetsModules, initWidgetsModules]);

    useEffect(() => {
        initEndpoints(config.endpoints);
    }, [config?.endpoints, initEndpoints]);

    useEffect(() => {
        if (config.inputsConfig) {
            initInputsConfig(config.inputsConfig);
        }
    }, [config?.inputsConfig, initInputsConfig]);

    useEffect(() => {
        if (config.physicsEnabled) {
            initPhysicsEnabled(config.physicsEnabled);
        }
    }, [config.physicsEnabled, initPhysicsEnabled]);

    useEffect(() => {
        if (config.editorMainMenu) {
            initMainMenu(config.editorMainMenu);
        }
    }, [config?.editorMainMenu, initMainMenu]);
};
