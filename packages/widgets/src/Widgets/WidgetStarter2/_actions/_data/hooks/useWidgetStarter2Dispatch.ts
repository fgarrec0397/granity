import { useAppDispatch } from "@granity/engine";

import { addYourWidgetAction } from "../state/widgetStarter2Reducer";

export default () => {
    const dispatch = useAppDispatch();

    const dispatchAdd = (message: string) => {
        dispatch(addYourWidgetAction(message));
    };

    return {
        dispatchAdd,
    };
};
