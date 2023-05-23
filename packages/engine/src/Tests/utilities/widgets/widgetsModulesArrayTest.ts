import { WidgetModules } from "@engine/App/Widgets/_actions/widgetsTypes";

import TestWidgetComponent from "./TestWidgetComponent";

export const widgetsModulesTest: WidgetModules[] = [
    {
        component: TestWidgetComponent,
        reducer: null,
        hasRef: true,
        name: "widget1",
    },
    {
        component: TestWidgetComponent,
        reducer: null,
        hasRef: true,
        name: "widget2",
    },
    {
        component: TestWidgetComponent,
        reducer: null,
        name: "widget3",
    },
];
