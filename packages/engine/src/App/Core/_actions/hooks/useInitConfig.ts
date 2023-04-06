import { useWidgetsModules } from "@engine/api";
import { useEffect } from "react";

import { EngineConfig } from "../coreTypes";
import useConfig from "./useConfig";

export default (config: EngineConfig) => {
    const { initWidgetsModules } = useWidgetsModules();
    const { initKeyboardMappings, initMainMenu, initEndpoints } = useConfig();

    useEffect(() => {
        if (config.widgetsModules) {
            initWidgetsModules(config.widgetsModules);
        }
    }, [config?.widgetsModules, initWidgetsModules]);

    useEffect(() => {
        initEndpoints(config.endpoints);
    }, [config?.endpoints, initEndpoints]);

    useEffect(() => {
        if (config.keyboardMappings) {
            initKeyboardMappings(config.keyboardMappings);
        }
    }, [config?.keyboardMappings, initKeyboardMappings]);

    useEffect(() => {
        if (config.editorMainMenu) {
            initMainMenu(config.editorMainMenu);
        }
    }, [config?.editorMainMenu, initMainMenu]);
};
