import { App } from "@engine/App/Core/_actions/coreTypes";
import { useDispatch } from "react-redux";

import { setApp } from "../state/coreReducer";

export default () => {
    const dispatch = useDispatch();

    const dispatchSetApp = (app: App) => {
        dispatch(setApp(app));
    };

    return {
        dispatchSetApp,
    };
};
