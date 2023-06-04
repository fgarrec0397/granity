import { GameWidgetDictionary } from "@engine/App/Game/_actions/gameTypes";
import { WidgetType } from "@engine/App/Widgets/_actions/widgetsConstants";
import { uidGenerator } from "@granity/helpers";

import TestWidgetComponent from "./TestWidgetComponent";

export const gameWidgetTestId1 = uidGenerator();
export const gameWidgetTestId2 = uidGenerator();
export const gameWidgetTestId3 = uidGenerator();

export const gameWidgetsDictionaryTest: GameWidgetDictionary = {
    [gameWidgetTestId1]: {
        component: TestWidgetComponent,
        id: gameWidgetTestId1,
        hasRef: true,
        type: WidgetType.GameObject,
        name: "widget1",
    },
    [gameWidgetTestId2]: {
        component: TestWidgetComponent,
        id: gameWidgetTestId2,
        hasRef: true,
        type: WidgetType.GameObject,
        name: "widget2",
    },
    [gameWidgetTestId3]: {
        component: TestWidgetComponent,
        id: gameWidgetTestId3,
        type: WidgetType.GameObject,
        name: "widget3",
    },
};
