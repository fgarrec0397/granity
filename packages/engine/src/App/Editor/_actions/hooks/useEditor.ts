import { FetchStatus } from "@engine/App/Core/_actions/coreTypes";
import useWidgets from "@engine/App/Widgets/_actions/hooks/useWidgets";
import { useCallback, useEffect } from "react";

import useEditorService from "../_data/hooks/useEditorService";
import { FilesData, ModesAvailable } from "../editorTypes";

export default () => {
    const {
        isEditor,
        hasEdited,
        hasEditorOpened,
        isEditing,
        isGameUIPreview,
        currentMode,
        updateIsEditor,
        updateHasEdited,
        updateIsEditing,
        updatedIsGameUIPreview,
        updateHasEditorOpened,
        updateCurrentMode,
        updatedIsGridEnabled,
        isGridEnabled,
        filesData,
        pathToLoadFiles,
        setPathToLoad,
        setFilesDataStatus,
        setFilesData,
        getFilesData,
        saveFiles,
        editFile,
        deleteFile,
    } = useEditorService();
    const { removeWidgetSelection } = useWidgets();

    useEffect(() => {
        if (isEditing && !hasEdited) {
            updateHasEdited(true);
        }
    }, [isEditing, hasEdited, updateHasEdited]);

    const openEditor = useCallback(() => {
        updateIsEditor(true);
    }, [updateIsEditor]);

    const closeEditor = useCallback(() => {
        updateIsEditor(false);
    }, [updateIsEditor]);

    const setIsEditing = useCallback(
        (value: boolean) => {
            updateIsEditing(value);
        },
        [updateIsEditing]
    );

    const toggleGrid = useCallback(() => {
        updatedIsGridEnabled(!isGridEnabled);
    }, [isGridEnabled, updatedIsGridEnabled]);

    const openEditorUIPreview = useCallback(() => {
        updatedIsGameUIPreview(true);
    }, [updatedIsGameUIPreview]);

    const closeEditorUIPreview = useCallback(() => {
        updatedIsGameUIPreview(false);
    }, [updatedIsGameUIPreview]);

    const setHasEditorOpened = useCallback(() => {
        updateHasEditorOpened();
    }, [updateHasEditorOpened]);

    const selectMode = useCallback(
        (mode: ModesAvailable) => {
            updateCurrentMode(mode);
        },
        [updateCurrentMode]
    );

    const onEditorPointerMissed = useCallback(
        (event: MouseEvent) => {
            event.stopPropagation();
            removeWidgetSelection();
        },
        [removeWidgetSelection]
    );

    const updateFilesStatus = useCallback(
        (newFilesStatus: FetchStatus) => {
            setFilesDataStatus(newFilesStatus);
        },
        [setFilesDataStatus]
    );

    const updateFiles = useCallback(
        (newFilesData: FilesData) => {
            setFilesData(newFilesData);
        },
        [setFilesData]
    );

    const updatePathToLoad = useCallback(
        (newPathToLoad: string) => {
            setPathToLoad(newPathToLoad);
        },
        [setPathToLoad]
    );

    const loadFiles = useCallback(
        (path: string) => {
            getFilesData(path);
        },
        [getFilesData]
    );

    return {
        isEditor,
        isEditing,
        hasEdited,
        hasEditorOpened,
        currentMode,
        isGameUIPreview,
        openEditor,
        closeEditor,
        openEditorUIPreview,
        closeEditorUIPreview,
        setIsEditing,
        setHasEditorOpened,
        selectMode,
        onEditorPointerMissed,
        toggleGrid,
        isGridEnabled,
        filesData,
        updateFiles,
        updateFilesStatus,
        loadFiles,
        saveFiles,
        editFile,
        deleteFile,
        updatePathToLoad,
        pathToLoadFiles,
    };
};
