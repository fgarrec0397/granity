import { useWidgetsModules } from "@granity-engine/api";
import { useEffect } from "react";

import { EngineConfig } from "../coreTypes";
import useCore from "./useCore";

export default (config: EngineConfig) => {
    const { initWidgetsModules } = useWidgetsModules();
    const { initOnSave, initKeyboardMappings } = useCore();
    const { widgetsModules, onSave, keyboardMappings } = config;

    useEffect(() => {
        if (widgetsModules) {
            initWidgetsModules(widgetsModules);
        }
    }, [initWidgetsModules, widgetsModules]);

    useEffect(() => {
        if (onSave) {
            initOnSave(onSave);
        }
    }, [onSave, initOnSave]);

    useEffect(() => {
        if (keyboardMappings) {
            initKeyboardMappings(keyboardMappings);
        }
    }, [initKeyboardMappings, keyboardMappings]);
};
