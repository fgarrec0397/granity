import { useCallback } from "react";

import { EditorModesAvailable, EditorStatus } from "../../editorConstants";
import useEditorDispatch from "./useEditorDispatch";
import useEditorSelector from "./useEditorSelector";

export default () => {
    const {
        dispatchSetEditorStatus,
        dispatchSetIsEditing,
        dispatchSetHasEditorOpened,
        dispatchSetHasEdited,
        dispatchSetIsMultipleSelect,
        dispatchSetIsGridEnabled,
        dispatchSetCurrentMode,
    } = useEditorDispatch();
    const { editorStatus, hasEdited, hasEditorOpened, isEditing, currentMode, isGridEnabled } =
        useEditorSelector();

    const updateEditorStatus = useCallback(
        (status: EditorStatus) => {
            dispatchSetEditorStatus(status);
        },
        [dispatchSetEditorStatus]
    );

    const updateIsEditing = useCallback(
        (value: boolean) => {
            dispatchSetIsEditing(value);
        },
        [dispatchSetIsEditing]
    );

    const updateHasEditorOpened = useCallback(() => {
        dispatchSetHasEditorOpened();
    }, [dispatchSetHasEditorOpened]);

    const updatedIsGridEnabled = useCallback(
        (value: boolean) => {
            dispatchSetIsGridEnabled(value);
        },
        [dispatchSetIsGridEnabled]
    );

    const updateHasEdited = useCallback(
        (value: boolean) => {
            dispatchSetHasEdited(value);
        },
        [dispatchSetHasEdited]
    );

    const updateIsMultipleSelect = useCallback(
        (value: boolean) => {
            dispatchSetIsMultipleSelect(value);
        },
        [dispatchSetIsMultipleSelect]
    );

    const updateCurrentMode = useCallback(
        (value: EditorModesAvailable) => {
            dispatchSetCurrentMode(value);
        },
        [dispatchSetCurrentMode]
    );

    return {
        editorStatus,
        hasEdited,
        hasEditorOpened,
        isEditing,
        currentMode,
        isGridEnabled,
        updateEditorStatus,
        updateIsEditing,
        updateHasEditorOpened,
        updateHasEdited,
        updatedIsGridEnabled,
        updateIsMultipleSelect,
        updateCurrentMode,
    };
};
