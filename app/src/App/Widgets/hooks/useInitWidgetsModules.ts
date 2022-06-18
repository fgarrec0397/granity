import { useCallback, useEffect } from "react";
import { WidgetModule } from "../types";
import useWidgetsModuleContext from "./core/useWidgetsModuleContext";
import widgetsM from "../@features/collector";

export default () => {
    const { widgetsModules, setWidgetsModules } = useWidgetsModuleContext();

    const initWidgetsModules = useCallback(
        (widgets: WidgetModule[]) => {
            setWidgetsModules(widgets);
        },
        [setWidgetsModules]
    );

    useEffect(() => {
        initWidgetsModules(widgetsM);
    }, [initWidgetsModules]);

    return { widgetsModules };
};
