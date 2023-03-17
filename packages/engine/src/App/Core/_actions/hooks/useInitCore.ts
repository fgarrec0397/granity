import { useWidgetsModules } from "@engine/api";
import { useEffect } from "react";

import { EngineConfig } from "../coreTypes";
import useCore from "./useCore";

export default (config?: EngineConfig) => {
    const { initWidgetsModules } = useWidgetsModules();
    const { initOnSave, initKeyboardMappings, initMainMenu } = useCore();

    useEffect(() => {
        if (config?.widgetsModules) {
            initWidgetsModules(config.widgetsModules);
        }
    }, [config?.widgetsModules, initWidgetsModules]);

    useEffect(() => {
        if (config?.onSave) {
            initOnSave(config.onSave);
        }
    }, [initOnSave, config?.onSave]);

    useEffect(() => {
        if (config?.keyboardMappings) {
            initKeyboardMappings(config.keyboardMappings);
        }
    }, [config?.keyboardMappings, initKeyboardMappings]);

    useEffect(() => {
        if (config?.editorMainMenu) {
            initMainMenu(config.editorMainMenu);
        }
    }, [config?.editorMainMenu, initKeyboardMappings, initMainMenu]);
};
