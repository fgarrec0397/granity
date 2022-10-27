import useWidgets from "@app/Widgets/_actions/hooks/useWidgets";
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
    };
};
