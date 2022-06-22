import { WidgetsDictionary } from "../widgetsTypes";

export default (widgetId: string, widgetsDictionary: WidgetsDictionary) => {
    const props: any = {}; // TODO -- fix any type here

    for (const option in widgetsDictionary[widgetId]?.options) {
        if ({}.hasOwnProperty.call(widgetsDictionary[widgetId]?.options, option)) {
            props[option] = widgetsDictionary[widgetId].options[option].value;
        }
    }

    return props;
};
