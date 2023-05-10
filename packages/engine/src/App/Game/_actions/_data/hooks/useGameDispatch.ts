import { useCallback } from "react";
import { useDispatch } from "react-redux";

import { setIsGamePaused } from "../state/gameReducer";

export default () => {
    const dispatch = useDispatch();

    const dispatchSetIsGamePaused = useCallback(
        (value: boolean) => {
            dispatch(setIsGamePaused(value));
        },
        [dispatch]
    );

    return {
        dispatchSetIsGamePaused,
    };
};
