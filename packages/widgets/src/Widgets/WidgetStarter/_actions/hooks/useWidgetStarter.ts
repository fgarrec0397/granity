import useWidgetStarterService from "../_data/hooks/useWidgetStarterService";

export default () => {
    const { add, widgetStarterMessage } = useWidgetStarterService();

    const makeThisWidgetAlive = () => {
        add("Your widget behaviour here!");
    };

    return { makeThisWidgetAlive, widgetStarterMessage };
};
