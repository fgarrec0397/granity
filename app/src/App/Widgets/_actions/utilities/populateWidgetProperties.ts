import { WidgetsInfoDictionary } from "../widgetsTypes";

export default (widgetId: string, widgetsInfoDictionary: WidgetsInfoDictionary) => {
    const props: any = {};

    for (const option in widgetsInfoDictionary[widgetId]?.options) {
        if ({}.hasOwnProperty.call(widgetsInfoDictionary[widgetId]?.options, option)) {
            props[option] = widgetsInfoDictionary[widgetId].options[option].value;
        }
    }

    return props;
};
