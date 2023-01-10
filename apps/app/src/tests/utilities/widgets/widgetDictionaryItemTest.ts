import { WidgetType } from "@app/Widgets/_actions/widgetsConstants";
import { WidgetObjectsDictionaryItem } from "@app/Widgets/_actions/widgetsTypes";
import { uidGenerator } from "helpers-granity";

import TestWidgetComponent from "./TestWidgetComponent";

export const widgetDictionaryItemTestId = uidGenerator();

const widgetDictionaryItemTest: WidgetObjectsDictionaryItem = {
    id: widgetDictionaryItemTestId,
    component: TestWidgetComponent,
    type: WidgetType.GameObject,
    name: "widgetDictionaryItemTest",
};

export default widgetDictionaryItemTest;
