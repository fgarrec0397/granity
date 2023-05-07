import { useCallback, useEffect, useMemo } from "react";

import useEditorService from "../_data/hooks/useEditorService";
import { EditorModesAvailable, EditorStatus } from "../editorConstants";

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
    } = useEditorService();
    const isEditor = useMemo(() => editorStatus === EditorStatus.IsEditor, [editorStatus]);
    const isGame = useMemo(() => editorStatus === EditorStatus.IsGame, [editorStatus]);
    const isPreview = useMemo(() => editorStatus === EditorStatus.IsPreview, [editorStatus]);
    const isGamePreview = useMemo(
        () => editorStatus === EditorStatus.IsGamePreview,
        [editorStatus]
    );
    const isUIPreview = useMemo(() => editorStatus === EditorStatus.IsUIPreview, [editorStatus]);

    useEffect(() => {
        if (isEditing && !hasEdited) {
            updateHasEdited(true);
        }
    }, [isEditing, hasEdited, updateHasEdited]);

    const setEditorStatus = useCallback(() => {
        updateEditorStatus(EditorStatus.IsEditor);
    }, [updateEditorStatus]);

    const setGameStatus = useCallback(() => {
        updateEditorStatus(EditorStatus.IsGame);
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

    return {
        editorStatus,
        isEditor,
        isGame,
        isPreview,
        isGamePreview,
        isUIPreview,
        isEditing,
        hasEdited,
        hasEditorOpened,
        currentMode,
        setEditorStatus,
        setGameStatus,
        setPreviewStatus,
        setGamePreviewStatus,
        setUIPreviewStatus,
        setIsEditing,
        setHasEditorOpened,
        selectMode,
        toggleGrid,
        isGridEnabled,
    };
};
