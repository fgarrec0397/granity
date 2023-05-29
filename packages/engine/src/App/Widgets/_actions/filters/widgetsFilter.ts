import { cloneDeep } from "@engine/../../helpers/src";

import { WidgetType } from "../widgetsConstants";
import { WidgetDictionary } from "../widgetsTypes";

/**
 * Take a  widgets dictionary and return a dictionary sorted by the given type
 */
const widgetsFilter = <WidgetsDictionaryType extends WidgetDictionary>(
    widgetsDictionary: WidgetDictionary,
    widgetType: WidgetType
): WidgetsDictionaryType => {
    const filteredWidgets = cloneDeep(widgetsDictionary);

    for (const key in widgetsDictionary) {
        const widget = widgetsDictionary[key];

        if (widget.type !== widgetType) {
            delete filteredWidgets[widget.id];
        }
    }

    return filteredWidgets as WidgetsDictionaryType;
};

export default widgetsFilter;
