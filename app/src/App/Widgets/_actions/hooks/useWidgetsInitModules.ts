import { useCallback, useEffect } from "react";

import { rawWidgetsModules } from "../../widgetsImports";
import { WidgetModule } from "../widgetsTypes";
import useWidgetsModules from "./useWidgetsModules";

export default () => {
    const { setWidgetsModules } = useWidgetsModules();

    const initWidgetsModules = useCallback(
        (widgets: WidgetModule[]) => {
            setWidgetsModules(widgets);
        },
        [setWidgetsModules]
    );

    useEffect(() => {
        initWidgetsModules(rawWidgetsModules);
    }, [initWidgetsModules]);
};
