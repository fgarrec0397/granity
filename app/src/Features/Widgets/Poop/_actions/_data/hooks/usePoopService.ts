import usePoopDispatch from "./usePoopDispatch";
import usePoopSelector from "./usePoopSelector";

export default () => {
    const { dispatchSetPoint, dispatchSetIsAlive } = usePoopDispatch();
    const poop = usePoopSelector();

    const updateScore = (score: number) => {
        dispatchSetPoint(score);
    };

    const updateIsAlive = (value: boolean) => {
        dispatchSetIsAlive(value);
    };

    return { isAlive: poop?.isAlive, score: poop?.score, updateScore, updateIsAlive };
};
