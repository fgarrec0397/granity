import { App, FetchStatus, FilesData } from "@engine/App/Core/_actions/coreTypes";
import { useCallback } from "react";
import { useDispatch } from "react-redux";

import {
    setApp,
    setFilesData,
    setFilesStatus,
    setPathToLoadFiles,
    setStatus,
} from "../state/coreReducer";

export default () => {
    const dispatch = useDispatch();

    const dispatchSetApp = useCallback(
        (app: App) => {
            dispatch(setApp(app));
        },
        [dispatch]
    );

    const dispatchSetStatus = useCallback(
        (newStatus: FetchStatus) => {
            dispatch(setStatus(newStatus));
        },
        [dispatch]
    );

    const dispatchSetFilesData = useCallback(
        (filesData: FilesData) => dispatch(setFilesData(filesData)),
        [dispatch]
    );

    const dispatchSetPathToLoadFiles = useCallback(
        (pathToLoad: string) => dispatch(setPathToLoadFiles(pathToLoad)),
        [dispatch]
    );

    const dispatchSetFilesStatus = useCallback(
        (status: FetchStatus) => dispatch(setFilesStatus(status)),
        [dispatch]
    );

    return {
        dispatchSetApp,
        dispatchSetStatus,
        dispatchSetFilesData,
        dispatchSetPathToLoadFiles,
        dispatchSetFilesStatus,
    };
};
