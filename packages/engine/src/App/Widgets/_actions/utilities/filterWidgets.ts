import { WidgetType } from "../widgetsConstants";
import { WidgetDictionary, WidgetDictionary, WidgetUIDictionary } from "../widgetsTypes";

type FilteredModules = {
    widgetsObjects: WidgetDictionary;
    widgetsUI: WidgetUIDictionary;
};

/**
 * Take an array of mixed widgets modules and return them sorted by types
 */
export default (widgetsDictionary: WidgetDictionary) => {
    const filteredModules: FilteredModules = {
        widgetsObjects: {},
        widgetsUI: {},
    };

    for (const key in widgetsDictionary) {
        const widget = widgetsDictionary[key];

        switch (widget.type) {
            case WidgetType.GameObject:
                filteredModules.widgetsObjects[widget.id] = widget;
                break;
            case WidgetType.UI:
                filteredModules.widgetsUI[widget.id] = widget;
                break;

            default:
                break;
        }
    }

    return filteredModules;
};
