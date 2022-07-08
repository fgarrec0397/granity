import { WidgetsDictionary } from "../widgetsTypes";

export default (widgetId: string, widgetsDictionary: WidgetsDictionary) => {
    const props: any = {};

    for (const option in widgetsDictionary[widgetId]?.options) {
        if ({}.hasOwnProperty.call(widgetsDictionary[widgetId]?.options, option)) {
            props[option] = widgetsDictionary[widgetId].options[option].value;
        }
    }

    return props;
};
