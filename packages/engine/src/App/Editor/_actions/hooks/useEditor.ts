import { FetchStatus } from "@engine/App/Core/_actions/coreTypes";
import useWidgets from "@engine/App/Widgets/_actions/hooks/useWidgets";
import { useCallback, useEffect, useMemo } from "react";

import useEditorService from "../_data/hooks/useEditorService";
import { EditorModesAvailable, EditorStatus } from "../editorConstants";
import { FilesData } from "../editorTypes";

export default () => {
    const {
        editorStatus,
        hasEdited,
        hasEditorOpened,
        isEditing,
        currentMode,
        updateEditorStatus,
        updateHasEdited,
        updateIsEditing,
        updateHasEditorOpened,
        updateCurrentMode,
        updatedIsGridEnabled,
        isGridEnabled,
        filesData,
        pathToLoadFiles,
        setPathToLoadFiles,
        setFilesDataStatus,
        setFilesData,
        getFilesData,
        saveFiles,
        editFile,
        deleteFile,
    } = useEditorService();
    const { removeWidgetSelection } = useWidgets();
    const isEditor = useMemo(() => editorStatus === EditorStatus.IsEditor, [editorStatus]);
    const IsPreview = useMemo(() => editorStatus === EditorStatus.IsPreview, [editorStatus]);
    const isGamePreview = useMemo(
        () => editorStatus === EditorStatus.IsGamePreview,
        [editorStatus]
    );
    const IsUIPreview = useMemo(() => editorStatus === EditorStatus.IsUIPreview, [editorStatus]);

    useEffect(() => {
        if (isEditing && !hasEdited) {
            updateHasEdited(true);
        }
    }, [isEditing, hasEdited, updateHasEdited]);

    const setEditorStatus = useCallback(() => {
        updateEditorStatus(EditorStatus.IsEditor);
    }, [updateEditorStatus]);

    const setPreviewStatus = useCallback(() => {
        updateEditorStatus(EditorStatus.IsPreview);
    }, [updateEditorStatus]);

    const setGamePreviewStatus = useCallback(() => {
        updateEditorStatus(EditorStatus.IsGamePreview);
    }, [updateEditorStatus]);

    const setUIPreviewStatus = useCallback(() => {
        updateEditorStatus(EditorStatus.IsUIPreview);
    }, [updateEditorStatus]);

    const setIsEditing = useCallback(
        (value: boolean) => {
            updateIsEditing(value);
        },
        [updateIsEditing]
    );

    const toggleGrid = useCallback(() => {
        updatedIsGridEnabled(!isGridEnabled);
    }, [isGridEnabled, updatedIsGridEnabled]);

    const setHasEditorOpened = useCallback(() => {
        updateHasEditorOpened();
    }, [updateHasEditorOpened]);

    const selectMode = useCallback(
        (mode: EditorModesAvailable) => {
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

    const updatePathToLoadFiles = useCallback(
        (newPathToLoad: string) => {
            setPathToLoadFiles(newPathToLoad);
        },
        [setPathToLoadFiles]
    );

    const loadFiles = useCallback(
        (path: string) => {
            getFilesData(path);
        },
        [getFilesData]
    );

    return {
        editorStatus,
        isEditor,
        IsPreview,
        isGamePreview,
        IsUIPreview,
        isEditing,
        hasEdited,
        hasEditorOpened,
        currentMode,
        setEditorStatus,
        setPreviewStatus,
        setGamePreviewStatus,
        setUIPreviewStatus,
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
        updatePathToLoadFiles,
        pathToLoadFiles,
    };
};
