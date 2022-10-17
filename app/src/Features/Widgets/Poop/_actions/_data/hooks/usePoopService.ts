import usePoopDispatch from "./usePoopDispatch";
import usePoopSelector from "./usePoopSelector";

export default () => {
    const { dispatchAddPoint, dispatchKillPoop } = usePoopDispatch();
    const { isAlive, score } = usePoopSelector();

    const addPoint = () => {
        dispatchAddPoint();
    };

    const killPoop = () => {
        dispatchKillPoop();
    };

    return { isAlive, score, addPoint, killPoop };
};
