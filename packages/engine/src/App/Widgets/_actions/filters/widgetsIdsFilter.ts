import { WidgetType } from "../widgetsConstants";
import { WidgetDictionary, WidgetsIds } from "../widgetsTypes";

/**
 * Take a  widgets dictionary and return a dictionary sorted by the given type
 */
const widgetsIdsFilter = (
    widgetsDictionary: WidgetDictionary,
    widgetsIds: WidgetsIds,
    widgetType: WidgetType
): WidgetsIds => {
    const filteredWidgetsIds: WidgetsIds = [];

    widgetsIds.forEach((id) => {
        if (typeof id === "string") {
            const widget = widgetsDictionary[id];

            if (widget.type === widgetType) {
                filteredWidgetsIds.push(widget.id);
            }
        } else {
            widgetsIdsFilter(widgetsDictionary, id[1], widgetType);
        }
    });

    return filteredWidgetsIds;
};

export default widgetsIdsFilter;
