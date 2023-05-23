import { WidgetDictionaryItem, WidgetModule } from "../widgetsTypes";

export default <T extends WidgetModule>(widget: T): WidgetDictionaryItem => {
    return {
        ...widget,
        id: "",
    };
};
