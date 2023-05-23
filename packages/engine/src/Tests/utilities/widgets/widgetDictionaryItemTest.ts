import { WidgetType } from "@engine/App/Widgets/_actions/widgetsConstants";
import { WidgetDictionaryItem } from "@engine/App/Widgets/_actions/widgetsTypes";
import { uidGenerator } from "@granity/helpers";

import TestWidgetComponent from "./TestWidgetComponent";

export const widgetDictionaryItemTestId = uidGenerator();

const widgetDictionaryItemTest: WidgetDictionaryItem = {
    id: widgetDictionaryItemTestId,
    component: TestWidgetComponent,
    type: WidgetType.GameObject,
    name: "widgetDictionaryItemTest",
};

export default widgetDictionaryItemTest;
