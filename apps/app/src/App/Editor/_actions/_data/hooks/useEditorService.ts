import { useCallback } from "react";

import { ModesAvailable } from "../../editorTypes";
import useEditorDispatch from "./useEditorDispatch";
import useEditorSelector from "./useEditorSelector";

export default () => {
    const {
        dispatchSetIsEditor,
        dispatchSetIsEditing,
        dispatchSetHasEditorOpened,
        dispatchSetIsGameUIPreview,
        dispatchSetHasEdited,
        dispatchSetIsMultipleSelect,
        dispatchSetCurrentMode,
    } = useEditorDispatch();
    const { isEditor, hasEdited, hasEditorOpened, isGameUIPreview, isEditing, currentMode } =
        useEditorSelector();

    const updateIsEditor = (value: boolean) => {
        dispatchSetIsEditor(value);
    };

    const updateIsEditing = (value: boolean) => {
        dispatchSetIsEditing(value);
    };

    const updateHasEditorOpened = () => {
        dispatchSetHasEditorOpened();
    };

    const updatedIsGameUIPreview = (value: boolean) => {
        dispatchSetIsGameUIPreview(value);
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

    const updateCurrentMode = (value: ModesAvailable) => {
        dispatchSetCurrentMode(value);
    };

    return {
        isEditor,
        hasEdited,
        hasEditorOpened,
        isEditing,
        isGameUIPreview,
        currentMode,
        updateIsEditor,
        updateIsEditing,
        updatedIsGameUIPreview,
        updateHasEditorOpened,
        updateHasEdited,
        updateIsMultipleSelect,
        updateCurrentMode,
    };
};
