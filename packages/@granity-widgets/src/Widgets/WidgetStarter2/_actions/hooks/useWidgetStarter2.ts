import useWidgetStarter2Service from "../_data/hooks/useWidgetStarter2Service";

export default () => {
    const { add, widgetStarter2Message } = useWidgetStarter2Service();

    const makeThisWidgetAlive = () => {
        add("Your widget behaviour here!");
    };

    return { makeThisWidgetAlive, widgetStarter2Message };
};
