import { useAppSelector } from "@app/Core/store";
import test2 from "@features/Widgets/index";
import { useCallback, useEffect } from "react";

import { WidgetModule } from "../widgetsTypes";
import useWidgetsModules from "./useWidgetsModules";

console.log(test2, "test2"); // TODO - now this is what allows widgets to load because it use @features/Widgets/index file
export default () => {
    const rawWidgets = useAppSelector((state) => {
        return state.widgetsModule.widgetsModules;
    });
    const { setWidgetsModules } = useWidgetsModules();
    const initWidgetsModules = useCallback(
        (widgets: WidgetModule[]) => {
            setWidgetsModules(widgets);
        },
        [setWidgetsModules]
    );

    useEffect(() => {
        initWidgetsModules(rawWidgets);
    }, [initWidgetsModules, rawWidgets]);
};
