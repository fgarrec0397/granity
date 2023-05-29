import { WidgetType } from "../widgetsConstants";
import { WidgetDictionary } from "../widgetsTypes";

/**
 * Take a  widgets dictionary and return a dictionary sorted by the given type
 */
const widgetsIdsFilter = (
    widgetsDictionary: WidgetDictionary,
    widgetType: WidgetType
): string[] => {
    const filteredWidgetsIds: string[] = [];

    for (const key in widgetsDictionary) {
        const widget = widgetsDictionary[key];

        if (widget.type === widgetType) {
            filteredWidgetsIds.push(widget.id);
        }
    }

    return filteredWidgetsIds;
};

export default widgetsIdsFilter;
