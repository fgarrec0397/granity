import { useDispatch } from "react-redux";

import { addPoint, killPoop } from "../state/poopReducer";

export default () => {
    const dispatch = useDispatch();

    const dispatchAddPoint = () => {
        dispatch(addPoint());
    };

    const dispatchKillPoop = () => {
        dispatch(killPoop());
    };

    return {
        dispatchAddPoint,
        dispatchKillPoop,
    };
};
