import { useWidgetsModules } from "@granity-engine/api";
import { useEffect } from "react";

import { EngineConfig } from "../coreTypes";
import useCore from "./useCore";

export default (config: EngineConfig) => {
    const { initWidgetsModules } = useWidgetsModules();
    const { initOnSave } = useCore();
    const { widgetsModules, onSave } = config;

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
};
