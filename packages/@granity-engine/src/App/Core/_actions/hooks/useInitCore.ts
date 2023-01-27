import { useWidgetsModules } from "@granity-engine/api";
import { useEffect } from "react";

import { EngineOptions } from "../coreTypes";
import useCore from "./useCore";

export default (engine: EngineOptions) => {
    const { initWidgetsModules } = useWidgetsModules();
    const { initOnSave } = useCore();
    const { widgetsModules, onSave } = engine;

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
