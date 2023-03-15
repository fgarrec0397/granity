import { uidGenerator } from "@granity/helpers";
import { WidgetType } from "@engine/App/Widgets/_actions/widgetsConstants";
import { WidgetObjectsDictionaryItem } from "@engine/App/Widgets/_actions/widgetsTypes";

import TestWidgetComponent from "./TestWidgetComponent";

export const widgetDictionaryItemTestId = uidGenerator();

const widgetDictionaryItemTest: WidgetObjectsDictionaryItem = {
    id: widgetDictionaryItemTestId,
    component: TestWidgetComponent,
    type: WidgetType.GameObject,
    name: "widgetDictionaryItemTest",
};

export default widgetDictionaryItemTest;
