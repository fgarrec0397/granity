import widgetsCollection from "../../../Features/collector";

export default (name: string) => {
    return widgetsCollection.find((x) => x.widgetDefinition.name === name)?.component;
};
