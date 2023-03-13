import { WidgetType } from "@granity/engine/App/Widgets/_actions/widgetsConstants";
import { WidgetObjectsDictionaryItem } from "@granity/engine/App/Widgets/_actions/widgetsTypes";
import { uidGenerator } from "@granity/helpers";

import TestWidgetComponent from "./TestWidgetComponent";

export const widgetDictionaryItemTestId = uidGenerator();

const widgetDictionaryItemTest: WidgetObjectsDictionaryItem = {
    id: widgetDictionaryItemTestId,
    component: TestWidgetComponent,
    type: WidgetType.GameObject,
    name: "widgetDictionaryItemTest",
};

export default widgetDictionaryItemTest;
