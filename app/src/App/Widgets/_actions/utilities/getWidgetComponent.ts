import rawWidgetsModules from "@features/collector";

export default (name: string) => {
    return rawWidgetsModules.find((x) => x.widgetDefinition.name === name)?.component;
};
