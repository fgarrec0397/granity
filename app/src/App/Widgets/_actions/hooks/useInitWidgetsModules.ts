import { useCallback, useEffect } from "react";
import { WidgetModule } from "../widgetsTypes";
import { useWidgetsModuleContext } from "../_data/hooks";
import { rawWidgetsModules } from "../../widgetsImports";

export default () => {
    const { widgetsModules, setWidgetsModules } = useWidgetsModuleContext();

    const initWidgetsModules = useCallback(
        (widgets: WidgetModule[]) => {
            setWidgetsModules(widgets);
        },
        [setWidgetsModules]
    );

    useEffect(() => {
        initWidgetsModules(rawWidgetsModules);
    }, [initWidgetsModules]);

    return { widgetsModules };
};
