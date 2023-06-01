import { WidgetType } from "../widgetsConstants";
import { WidgetDictionary } from "../widgetsTypes";

/**
 * Take a  widgets dictionary and return a dictionary sorted by the given type
 */
const widgetsIdsFilter = (
    widgetsDictionary: WidgetDictionary,
    widgetsIds: string[],
    widgetType: WidgetType
): string[] => {
    const filteredWidgetsIds: string[] = [];

    widgetsIds.forEach((id) => {
        const widget = widgetsDictionary[id];

        if (widget.type === widgetType) {
            filteredWidgetsIds.push(widget.id);
        }
    });

    return filteredWidgetsIds;
};

export default widgetsIdsFilter;
