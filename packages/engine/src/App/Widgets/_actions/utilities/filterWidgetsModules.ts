import { WidgetType } from "../widgetsConstants";
import { WidgetModules, WidgetObjectModule, WidgetUIModule } from "../widgetsTypes";

type FilteredModules = {
    widgetsObjectModules: WidgetObjectModule[];
    widgetsUIModules: WidgetUIModule[];
};

/**
 * Take an array of mixed widgets modules and return them sorted by types
 */
export default (widgetModules: WidgetModules[]) => {
    const filteredModules: FilteredModules = {
        widgetsObjectModules: [],
        widgetsUIModules: [],
    };

    widgetModules.forEach((x) => {
        switch (x.type) {
            case WidgetType.GameObject:
                filteredModules.widgetsObjectModules.push(x);
                break;
            case WidgetType.UI:
                filteredModules.widgetsUIModules.push(x);
                break;

            default:
                filteredModules.widgetsObjectModules.push(x);
                break;
        }
    });

    return filteredModules;
};
