import { useAppSelector } from "@app/Core/store";
import rawWidgetsModules from "@features/Widgets";
import { useCallback, useEffect } from "react";

import { WidgetModule } from "../widgetsTypes";
import useWidgetsModules from "./useWidgetsModules";

export default () => {
    const test = useAppSelector((state) => {
        console.log(state, "state");
    });
    // const { setWidgetsModules } = useWidgetsModules();
    // const initWidgetsModules = useCallback(
    //     (widgets: WidgetModule[]) => {
    //         setWidgetsModules(widgets);
    //     },
    //     [setWidgetsModules]
    // );
    // useEffect(() => {
    //     initWidgetsModules(rawWidgetsModules);
    // }, [initWidgetsModules]);
};
