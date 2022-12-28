import { uidGenerator } from "@app/Common/utilities";
import { WidgetType } from "@app/Widgets/_actions/widgetsConstants";
import { WidgetObjectsDictionaryItem } from "@app/Widgets/_actions/widgetsTypes";

import TestWidgetComponent from "./TestWidgetComponent";

export const widgetDictionaryItemTestId = uidGenerator();

const widgetDictionaryItemTest: WidgetObjectsDictionaryItem = {
    id: widgetDictionaryItemTestId,
    component: TestWidgetComponent,
    type: WidgetType.GameObject,
    name: "widgetDictionaryItemTest",
};

export default widgetDictionaryItemTest;
