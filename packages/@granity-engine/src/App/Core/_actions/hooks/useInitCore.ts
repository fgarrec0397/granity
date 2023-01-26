import { useWidgetsModules } from "@granity-engine/api";
import { useEffect } from "react";

import { EngineOptions } from "../coreTypes";

export default (engine: EngineOptions) => {
    const { initWidgetsModules } = useWidgetsModules();
    const { widgetsModules } = engine;

    useEffect(() => {
        if (widgetsModules) {
            initWidgetsModules(widgetsModules);
        }
    }, [initWidgetsModules, widgetsModules]);
};
