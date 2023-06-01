import { cloneDeep } from "@engine/../../helpers/src";

import { WidgetType } from "../widgetsConstants";
import { WidgetDictionary, WidgetInfoDictionary } from "../widgetsTypes";

/**
 * Take a  widgets dictionary and return a dictionary sorted by the given type
 */
const widgetsInfoFilter = <WidgetsDictionaryType extends WidgetInfoDictionary>(
    widgetsInfoDictionary: WidgetInfoDictionary,
    widgetsDictionary: WidgetDictionary,
    widgetType: WidgetType
): WidgetsDictionaryType => {
    const filteredWidgetsInfo = cloneDeep(widgetsInfoDictionary);

    Object.keys(widgetsDictionary).forEach((x) => {
        const widgetItem = widgetsDictionary[x];

        if (widgetItem.type !== widgetType) {
            delete filteredWidgetsInfo[widgetItem.id];
        }
    });

    return filteredWidgetsInfo as WidgetsDictionaryType;
};

export default widgetsInfoFilter;
