import { rawWidgetsModules } from "../../widgetsImports";

export default (name: string) => {
    return rawWidgetsModules.find((x) => x.widgetDefinition.name === name)?.component;
};
