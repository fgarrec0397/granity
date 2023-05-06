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

    const dispatchSetApp = (app: App) => {
        dispatch(setApp(app));
    };

    const dispatchSetStatus = (newStatus: FetchStatus) => {
        dispatch(setStatus(newStatus));
    };

    const dispatchSetFilesData = (filesData: FilesData) => dispatch(setFilesData(filesData));

    const dispatchSetPathToLoadFiles = (pathToLoad: string) =>
        dispatch(setPathToLoadFiles(pathToLoad));

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
