import { WidgetType } from "@granity-engine/App/Widgets/_actions/widgetsConstants";
import { WidgetModules } from "@granity-engine/App/Widgets/_actions/widgetsTypes";

import TestWidgetComponent from "./TestWidgetComponent";

export const widgetsModulesTest: WidgetModules = {
    component: TestWidgetComponent,
    reducer: null,
    hasRef: true,
    type: WidgetType.GameObject,
    name: "widget1",
};
