import { useCallback } from "react";
import { WidgetModule } from "../types";
import useWidgetsModuleContext from "./core/useWidgetsModuleContext";

export default () => {
    const { widgetsModules, setWidgetsModules } = useWidgetsModuleContext();

    const initWidgetsModules = useCallback(
        (widgets: WidgetModule[]) => {
            setWidgetsModules(widgets);
        },
        [setWidgetsModules]
    );

    return { widgetsModules, initWidgetsModules };
};
