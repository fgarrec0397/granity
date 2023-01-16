import useWidgetStarterService from "../_data/hooks/useWidgetStarterService";

export default () => {
    const { add } = useWidgetStarterService();

    const makeThisWidgetAlive = () => {
        add("Your widget behaviour here!");
    };

    return { makeThisWidgetAlive };
};
