import usePoopService from "../_data/hooks/usePoopService";

export default () => {
    const { isAlive, score, addPoint, killPoop } = usePoopService();

    const passToilet = () => {
        addPoint();
    };

    const die = () => {
        killPoop();
    };

    return { isAlive, score, passToilet, die };
};
