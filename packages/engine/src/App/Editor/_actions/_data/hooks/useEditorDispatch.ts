import { useAppDispatch } from "@engine/App/Core/_actions/_data/state/store";
import { FetchStatus } from "@engine/App/Core/_actions/coreTypes";
import { useCallback } from "react";

import { EditorModesAvailable, EditorStatus } from "../../editorConstants";
import { FilesData } from "../../editorTypes";
import {
    setCurrentMode,
    setEditorStatus,
    setHasEdited,
    setHasEditorOpened,
    setIsEditing,
    setIsGridEnabled,
    setIsMultipleSelect,
} from "../state/editorUtilsReducer";
import { setFilesData, setPathToLoadFiles, setStatus } from "../state/filesReducer";

export default () => {
    const dispatch = useAppDispatch();

    const dispatchSetEditorStatus = (value: EditorStatus) => dispatch(setEditorStatus(value));

    const dispatchSetIsEditing = (value: boolean) => dispatch(setIsEditing(value));

    const dispatchSetHasEditorOpened = () => dispatch(setHasEditorOpened());

    const dispatchSetHasEdited = (value: boolean) => dispatch(setHasEdited(value));

    const dispatchSetIsMultipleSelect = (value: boolean) => dispatch(setIsMultipleSelect(value));

    const dispatchSetIsGridEnabled = (value: boolean) => dispatch(setIsGridEnabled(value));

    const dispatchSetCurrentMode = (mode: EditorModesAvailable) => dispatch(setCurrentMode(mode));

    const dispatchSetFilesData = (filesData: FilesData) => dispatch(setFilesData(filesData));

    const dispatchSetPathToLoadFiles = (pathToLoad: string) =>
        dispatch(setPathToLoadFiles(pathToLoad));

    const dispatchSetFilesDataStatus = useCallback(
        (status: FetchStatus) => dispatch(setStatus(status)),
        [dispatch]
    );

    return {
        dispatchSetEditorStatus,
        dispatchSetIsEditing,
        dispatchSetHasEditorOpened,
        dispatchSetHasEdited,
        dispatchSetIsMultipleSelect,
        dispatchSetIsGridEnabled,
        dispatchSetCurrentMode,
        dispatchSetFilesData,
        dispatchSetPathToLoadFiles,
        dispatchSetFilesDataStatus,
    };
};
