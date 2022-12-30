import { WidgetDictionaryItem } from "../widgetsTypes";

export default (widget: WidgetDictionaryItem) => {
    return widget.displayName || widget.name;
};
