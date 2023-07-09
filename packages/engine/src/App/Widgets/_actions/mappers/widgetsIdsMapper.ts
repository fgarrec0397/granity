import { WidgetDictionary, WidgetsIds } from "../widgetsTypes";

const widgetsIdsMapper = (widgetDictionary: WidgetDictionary | string[]): WidgetsIds => {
    const idsArray = Array.isArray(widgetDictionary)
        ? widgetDictionary
        : Object.keys(widgetDictionary);
    return idsArray.map((x, index) => ({ id: x, path: index.toString() }));
};

export default widgetsIdsMapper;
