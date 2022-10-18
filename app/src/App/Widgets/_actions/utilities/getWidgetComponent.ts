import rawWidgetsModules from "@features/Widgets";

export default (name: string) => {
    return rawWidgetsModules.find((x) => x.widgetDefinition.name === name)?.component;
};
