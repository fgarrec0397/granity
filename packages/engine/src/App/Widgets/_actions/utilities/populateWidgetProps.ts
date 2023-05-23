import { WidgetInfoDictionary } from "../widgetsTypes";

export default (widgetId: string, widgetsObjectInfoDictionary: WidgetInfoDictionary) => {
    const props: any = {};

    if (widgetsObjectInfoDictionary[widgetId]?.options) {
        // Loop through all options of the widget dictionary item
        for (const key in widgetsObjectInfoDictionary[widgetId].options) {
            props[key] = widgetsObjectInfoDictionary[widgetId].options?.[key].value;
        }
    }

    return props;
};
