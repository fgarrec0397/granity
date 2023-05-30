import { WidgetType } from "../widgetsConstants";
import { WidgetDictionaryItem } from "../widgetsTypes";

/**
 * Take a  widgets dictionary and return a dictionary sorted by the given type
 */
const selectedWidgetsFilter = <WidgetDictionaryItemType extends WidgetDictionaryItem>(
    widgetsDictionaryItems: WidgetDictionaryItem[],
    widgetType: WidgetType
): WidgetDictionaryItemType[] => {
    const filteredSelectedWidgets: WidgetDictionaryItemType[] = [];

    widgetsDictionaryItems.forEach((x) => {
        if (x.type === widgetType) {
            filteredSelectedWidgets.push(x as WidgetDictionaryItemType);
        }
    });

    return filteredSelectedWidgets;
};

export default selectedWidgetsFilter;
