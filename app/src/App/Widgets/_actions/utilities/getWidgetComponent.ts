import rawWidgetsModules from "@features/Core/collector";

export default (name: string) => {
    return rawWidgetsModules.find((x) => x.widgetDefinition.name === name)?.component;
};
