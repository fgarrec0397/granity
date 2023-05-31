import { GameWidgetInfoDictionary } from "../gameTypes";

export default (widgetId: string, widgetsInfoDictionary: GameWidgetInfoDictionary) => {
    const props: any = {};

    if (widgetsInfoDictionary[widgetId]?.options) {
        // Loop through all options of the widget dictionary item
        for (const key in widgetsInfoDictionary[widgetId].options) {
            props[key] = widgetsInfoDictionary[widgetId].options?.[key].value;
        }
    }

    return props;
};
