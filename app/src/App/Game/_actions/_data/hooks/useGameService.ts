import useGameDispatch from "./useGameDispatch";
import useGameSelector from "./useGameSelector";

export default () => {
    const { dispatchSetIsGamePaused } = useGameDispatch();
    const { isGamePaused } = useGameSelector();

    const updateIsGamePaused = (value: boolean) => {
        dispatchSetIsGamePaused(value);
    };

    return {
        isGamePaused,
        updateIsGamePaused,
    };
};
