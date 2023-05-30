import { WidgetType } from "@engine/api";
import { GameWidgetDictionaryItem } from "@engine/App/Game/_actions/gameTypes";
import { uidGenerator } from "@granity/helpers";

import TestWidgetComponent from "./TestWidgetComponent";

export const widgetDictionaryItemTestId = uidGenerator();

const widgetDictionaryItemTest: GameWidgetDictionaryItem = {
    id: widgetDictionaryItemTestId,
    component: TestWidgetComponent,
    name: "widgetDictionaryItemTest",
    type: WidgetType.GameObject,
};

export default widgetDictionaryItemTest;
