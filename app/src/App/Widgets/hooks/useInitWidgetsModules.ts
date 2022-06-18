import { useCallback, useEffect } from "react";
import { WidgetModule } from "@app/Widgets/widgetsTypes";
import { useWidgetsModuleContext } from "./core";
import widgetsM from "@features/collector";

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
