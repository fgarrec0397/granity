import { useDispatch } from "react-redux";

import { setIsGamePaused } from "../state/gameReducer";

export default () => {
    const dispatch = useDispatch();

    const dispatchSetIsGamePaused = (value: boolean) => {
        dispatch(setIsGamePaused(value));
    };

    return {
        dispatchSetIsGamePaused,
    };
};
