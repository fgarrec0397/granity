import { WidgetType } from "../widgetsConstants";
import { WidgetModule } from "../widgetsTypes";

/**
 * Take a  widgets dictionary and return a dictionary sorted by the given type
 */
const widgetsModulesFilter = <WidgetModuleType>(
    widgetsModules: WidgetModule[],
    widgetType: WidgetType
): WidgetModuleType[] => {
    const filteredWidgetsModules: WidgetModuleType[] = [];

    widgetsModules.forEach((widget) => {
        if (widgetType === widget.type) {
            filteredWidgetsModules.push(widget as WidgetModuleType);
        }
    });

    return filteredWidgetsModules as WidgetModuleType[];
};

export default widgetsModulesFilter;
