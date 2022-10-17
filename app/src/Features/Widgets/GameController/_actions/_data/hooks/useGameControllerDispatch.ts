import { useDispatch } from "react-redux";

import { addYourWidgetAction } from "../state/gameControllerReducer";

export default () => {
    const dispatch = useDispatch();

    const dispatchAdd = (message: string) => {
        dispatch(addYourWidgetAction(message));
    };

    return {
        dispatchAdd,
    };
};
