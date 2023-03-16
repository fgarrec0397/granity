import { WidgetType } from "../widgetsConstants";
import { WidgetDictionary } from "../widgetsTypes";

type FilteredWidgetsIds = {
    widgetsObjectsIds: string[];
    widgetsUIIds: string[];
};

/**
 * Take an array of mixed widgets ids and return them sorted by types
 */
export default (widgetsDictionary: WidgetDictionary, widgetsIds: string[]) => {
    const filteredModules: FilteredWidgetsIds = {
        widgetsObjectsIds: [],
        widgetsUIIds: [],
    };

    widgetsIds.forEach((id) => {
        const widget = widgetsDictionary[id];

        switch (widget.type) {
            case WidgetType.GameObject:
                filteredModules.widgetsObjectsIds.push(id);
                break;
            case WidgetType.UI:
                filteredModules.widgetsUIIds.push(id);
                break;

            default:
                break;
        }
    });

    return filteredModules;
};
