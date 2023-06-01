import { WidgetInfoDictionaryItem } from "@engine/api";

import { GameWidgetInfoDictionaryItem } from "../gameTypes";

export default (
    widgetInfo: WidgetInfoDictionaryItem,
    gameWidgetInfo?: Partial<GameWidgetInfoDictionaryItem>
) => {
    return {
        ...widgetInfo,
        ...gameWidgetInfo,
    } as GameWidgetInfoDictionaryItem;
};
