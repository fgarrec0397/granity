import { useDispatch } from "react-redux";

import { setIsAlive, setScore } from "../state/poopReducer";

export default () => {
    const dispatch = useDispatch();

    const dispatchSetPoint = (score: number) => {
        dispatch(setScore(score));
    };

    const dispatchSetIsAlive = (value: boolean) => {
        dispatch(setIsAlive(value));
    };

    return {
        dispatchSetPoint,
        dispatchSetIsAlive,
    };
};
