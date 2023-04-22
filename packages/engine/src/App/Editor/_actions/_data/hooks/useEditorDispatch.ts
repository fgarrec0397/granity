import { useAppDispatch } from "@engine/App/Core/_actions/_data/state/store";
import { FetchStatus } from "@engine/App/Core/_actions/coreTypes";
import { useCallback } from "react";

import { FilesData, ModesAvailable } from "../../editorTypes";
import {
    setCurrentMode,
    setHasEdited,
    setHasEditorOpened,
    setIsEditing,
    setIsEditor,
    setIsGameUIPreview,
    setIsGridEnabled,
    setIsMultipleSelect,
} from "../state/editorUtilsReducer";
import { setFilesData, setPathToLoadFiles, setStatus } from "../state/filesReducer";

export default () => {
    const dispatch = useAppDispatch();

    const dispatchSetIsEditor = (value: boolean) => dispatch(setIsEditor(value));

    const dispatchSetIsEditing = (value: boolean) => dispatch(setIsEditing(value));

    const dispatchSetHasEditorOpened = () => dispatch(setHasEditorOpened());

    const dispatchSetIsGameUIPreview = (value: boolean) => dispatch(setIsGameUIPreview(value));

    const dispatchSetHasEdited = (value: boolean) => dispatch(setHasEdited(value));

    const dispatchSetIsMultipleSelect = (value: boolean) => dispatch(setIsMultipleSelect(value));

    const dispatchSetIsGridEnabled = (value: boolean) => dispatch(setIsGridEnabled(value));

    const dispatchSetCurrentMode = (mode: ModesAvailable) => dispatch(setCurrentMode(mode));

    const dispatchSetFilesData = (filesData: FilesData) => dispatch(setFilesData(filesData));

    const dispatchSetPathToLoadFiles = (pathToLoad: string) =>
        dispatch(setPathToLoadFiles(pathToLoad));

    const dispatchSetFilesDataStatus = useCallback(
        (status: FetchStatus) => dispatch(setStatus(status)),
        [dispatch]
    );

    return {
        dispatchSetIsEditor,
        dispatchSetIsEditing,
        dispatchSetHasEditorOpened,
        dispatchSetIsGameUIPreview,
        dispatchSetHasEdited,
        dispatchSetIsMultipleSelect,
        dispatchSetIsGridEnabled,
        dispatchSetCurrentMode,
        dispatchSetFilesData,
        dispatchSetPathToLoadFiles,
        dispatchSetFilesDataStatus,
    };
};
