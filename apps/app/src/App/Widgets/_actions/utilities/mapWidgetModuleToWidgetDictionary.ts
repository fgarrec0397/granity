import { WidgetDictionaryItem, WidgetModules } from "../widgetsTypes";

export default <T extends WidgetModules>(widget: T): WidgetDictionaryItem => {
    return {
        ...widget,
        id: "",
    };
};
