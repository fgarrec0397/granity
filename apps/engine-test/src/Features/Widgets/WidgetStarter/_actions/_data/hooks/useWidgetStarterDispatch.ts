import { useDispatch } from "react-redux";

import { addYourWidgetAction } from "../state/widgetStarterReducer";

export default () => {
    const dispatch = useDispatch();

    const dispatchAdd = (message: string) => {
        dispatch(addYourWidgetAction(message));
    };

    return {
        dispatchAdd,
    };
};
