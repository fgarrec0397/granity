import { useCallback, useEffect } from "react";

import { rawWidgetsModules } from "../../widgetsImports";
import { useWidgetsModuleContext } from "../_data/hooks";
import { WidgetModule } from "../widgetsTypes";

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
