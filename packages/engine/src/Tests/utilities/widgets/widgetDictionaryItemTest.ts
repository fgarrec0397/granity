import { WidgetDictionaryItem } from "@engine/App/Widgets/_actions/widgetsTypes";
import { uidGenerator } from "@granity/helpers";

import TestWidgetComponent from "./TestWidgetComponent";

export const widgetDictionaryItemTestId = uidGenerator();

const widgetDictionaryItemTest: WidgetDictionaryItem = {
    id: widgetDictionaryItemTestId,
    component: TestWidgetComponent,
    name: "widgetDictionaryItemTest",
};

export default widgetDictionaryItemTest;
