import { FeaturesWidgetsProps } from "@features/Widgets";

import { WidgetType } from "../widgetsConstants";
import { WidgetObjectModule, WidgetUIModule } from "../widgetsTypes";

type FilteredModules = {
    widgetsModules: WidgetObjectModule[];
    widgetsUIModules: WidgetUIModule[];
};

/**
 * Take an array of mixed widgets modules and return them sorted by types
 */
export default (
    loadedWidgetsModules:
        | WidgetObjectModule<FeaturesWidgetsProps, null>[]
        | WidgetUIModule<FeaturesWidgetsProps>[]
) => {
    const filteredModules: FilteredModules = {
        widgetsModules: [],
        widgetsUIModules: [],
    };

    loadedWidgetsModules.forEach((x) => {
        switch (x.type) {
            case WidgetType.GameObject:
                filteredModules.widgetsModules.push(x);
                break;
            case WidgetType.UI:
                filteredModules.widgetsUIModules.push(x);
                break;

            default:
                filteredModules.widgetsModules.push(x);
                break;
        }
    });

    return filteredModules;
};
