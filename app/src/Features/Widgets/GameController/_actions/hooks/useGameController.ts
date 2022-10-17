import useGameControllerService from "../_data/hooks/useGameControllerService";

export default () => {
    const { add } = useGameControllerService();

    const makeThisWidgetAlive = () => {
        add("Your widget behaviour here!");
    };

    return { makeThisWidgetAlive };
};
