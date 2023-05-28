import {
    WidgetDictionary,
    WidgetDictionaryItem,
    WidgetInfoDictionary,
    WidgetInfoDictionaryItem,
} from "../widgetsTypes";

/**
 *
 * Builds a widgetsInfoDictionary based on the given widgetsDictionary to fill the values
 *
 * @param widgets - The widgets taken to build the widgetsInfoDictionary
 * @returns - A WidgetInfoDictionary
 */
export const buildWidgetInfoDictionary = <WidgetDictionaryType extends WidgetDictionary>(
    widgets: WidgetDictionaryType
) => {
    const widgetsInfoDictionary: WidgetInfoDictionary = {};

    for (const key in widgets) {
        const dictionaryItem = buildWidgetInfo(widgets[key]);

        widgetsInfoDictionary[dictionaryItem.id] = {
            ...dictionaryItem,
        };
    }

    return widgetsInfoDictionary;
};

/**
 *
 * Builds a widgetsInfoDictionary based on the given widgetsDictionaryItem to fill the values
 *
 * @param widget - The taken widget to build the widgetObjectInfo
 * @param builderOptions - Overrides the widget options by passing your own options
 * @returns - A WidgetInfoDictionaryItem
 */
export const buildWidgetInfo = <WidgetDictionaryItemType extends WidgetDictionaryItem>(
    widget: WidgetDictionaryItemType
): WidgetInfoDictionaryItem => {
    const displayName = widget.name;

    return { id: widget.id!, displayName };
};
