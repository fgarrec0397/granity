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

    widgetsIds.forEach((item) => {
        // console.log(item, "item is an array");
        const widget = widgetsDictionary[item.id];

        if (widget.type === widgetType) {
            filteredWidgetsIds.push(item);
        }
    });

    return filteredWidgetsIds;
};

export default widgetsIdsFilter;
