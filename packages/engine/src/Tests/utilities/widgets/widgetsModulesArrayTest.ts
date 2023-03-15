import { WidgetType } from "@engine/App/Widgets/_actions/widgetsConstants";
import { WidgetModules } from "@engine/App/Widgets/_actions/widgetsTypes";

import TestWidgetComponent from "./TestWidgetComponent";

export const widgetsModulesTest: WidgetModules[] = [
    {
        component: TestWidgetComponent,
        reducer: null,
        hasRef: true,
        type: WidgetType.GameObject,
        name: "widget1",
    },
    {
        component: TestWidgetComponent,
        reducer: null,
        hasRef: true,
        type: WidgetType.GameObject,
        name: "widget2",
    },
    {
        component: TestWidgetComponent,
        reducer: null,
        type: WidgetType.UI,
        name: "widget3",
    },
];
