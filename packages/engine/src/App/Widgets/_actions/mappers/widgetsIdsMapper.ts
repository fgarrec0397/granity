import { WidgetDictionary, WidgetsIds } from "../widgetsTypes";

const widgetsIdsMapper = (widgetDictionary: WidgetDictionary): WidgetsIds => {
    return Object.keys(widgetDictionary).map((x, index) => ({ id: x, path: index.toString() }));
};

export default widgetsIdsMapper;
