import { App, FetchStatus } from "@engine/App/Core/_actions/coreTypes";
import { useDispatch } from "react-redux";

import { setApp, setStatus } from "../state/coreReducer";

export default () => {
    const dispatch = useDispatch();

    const dispatchSetApp = (app: App) => {
        dispatch(setApp(app));
    };

    const dispatchSetStatus = (newStatus: FetchStatus) => {
        dispatch(setStatus(newStatus));
    };

    return {
        dispatchSetApp,
        dispatchSetStatus,
    };
};
