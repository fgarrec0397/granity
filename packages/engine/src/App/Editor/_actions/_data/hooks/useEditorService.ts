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
        dispatchSetIsDebugEnabled,
        dispatchSetCurrentMode,
    } = useEditorDispatch();
    const { editorStatus, hasEdited, hasEditorOpened, isEditing, currentMode, isDebugEnabled } =
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

    const updateDebugEnabled = useCallback(
        (value: boolean) => {
            dispatchSetIsDebugEnabled(value);
        },
        [dispatchSetIsDebugEnabled]
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
        isDebugEnabled,
        updateEditorStatus,
        updateIsEditing,
        updateHasEditorOpened,
        updateHasEdited,
        updateDebugEnabled,
        updateIsMultipleSelect,
        updateCurrentMode,
    };
};
