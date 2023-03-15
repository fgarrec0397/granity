import { useAppDispatch } from "@granity/engine";

import { addYourWidgetAction } from "../state/widgetStarterReducer";

export default () => {
    const dispatch = useAppDispatch();

    const dispatchAdd = (message: string) => {
        dispatch(addYourWidgetAction(message));
    };

    return {
        dispatchAdd,
    };
};
