const mapWidgetModuleToWidgetDictionary = <WidgetModuleType, WidgetDictionaryItemType>(
    widget: WidgetModuleType
) => {
    return {
        ...widget,
        id: "",
    } as WidgetDictionaryItemType;
};

export default mapWidgetModuleToWidgetDictionary;
