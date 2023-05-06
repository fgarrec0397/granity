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

    const updateEditorStatus = (status: EditorStatus) => {
        dispatchSetEditorStatus(status);
    };

    const updateIsEditing = (value: boolean) => {
        dispatchSetIsEditing(value);
    };

    const updateHasEditorOpened = () => {
        dispatchSetHasEditorOpened();
    };

    const updatedIsGridEnabled = (value: boolean) => {
        dispatchSetIsGridEnabled(value);
    };

    const updateHasEdited = useCallback(
        (value: boolean) => {
            dispatchSetHasEdited(value);
        },
        [dispatchSetHasEdited]
    );

    const updateIsMultipleSelect = (value: boolean) => {
        dispatchSetIsMultipleSelect(value);
    };

    const updateCurrentMode = (value: EditorModesAvailable) => {
        dispatchSetCurrentMode(value);
    };

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
