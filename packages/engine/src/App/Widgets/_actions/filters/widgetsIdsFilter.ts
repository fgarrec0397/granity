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

    // Issue widgetsIds is here

    widgetsIds.forEach((id) => {
        if (typeof id === "string") {
            console.log(id, "id is string");

            const widget = widgetsDictionary[id];

            if (widget.type === widgetType) {
                filteredWidgetsIds.push(id);
            }
        } else {
            console.log(id, "id is an array");
            const widget = widgetsDictionary[id[0]];

            if (widget.type === widgetType) {
                filteredWidgetsIds.push(id);
            }
            // widgetsIdsFilter(widgetsDictionary, id[1], widgetType);
        }
    });

    return filteredWidgetsIds;
};

export default widgetsIdsFilter;
