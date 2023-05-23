import { WidgetModule } from "@engine/App/Widgets/_actions/widgetsTypes";

import TestWidgetComponent from "./TestWidgetComponent";

export const widgetsModulesTest: WidgetModule = {
    component: TestWidgetComponent,
    reducer: null,
    hasRef: true,
    name: "widget1",
};
