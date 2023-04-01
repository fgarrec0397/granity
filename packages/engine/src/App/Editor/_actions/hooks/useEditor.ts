import useWidgets from "@engine/App/Widgets/_actions/hooks/useWidgets";
import { useCallback, useEffect } from "react";

import useEditorService from "../_data/hooks/useEditorService";
import { ModesAvailable } from "../editorTypes";

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
        getFiles,
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

    const files = useCallback(
        (path: string) => {
            return getFiles(path);
        },
        [getFiles]
    );

    return {
        isEditor,
        isEditing,
        hasEdited,
        hasEditorOpened,
        currentMode,
        isGameUIPreview,
        files,
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
    };
};
