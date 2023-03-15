import { useAppDispatch } from "@engine/App/Core/_actions/_data/state/store";

import { ModesAvailable } from "../../editorTypes";
import {
    setCurrentMode,
    setHasEdited,
    setHasEditorOpened,
    setIsEditing,
    setIsEditor,
    setIsGameUIPreview,
    setIsGridEnabled,
    setIsMultipleSelect,
} from "../state/editorReducer";

export default () => {
    const dispatch = useAppDispatch();

    const dispatchSetIsEditor = (value: boolean) => dispatch(setIsEditor(value));

    const dispatchSetIsEditing = (value: boolean) => dispatch(setIsEditing(value));

    const dispatchSetHasEditorOpened = () => dispatch(setHasEditorOpened());

    const dispatchSetIsGameUIPreview = (value: boolean) => dispatch(setIsGameUIPreview(value));

    const dispatchSetHasEdited = (value: boolean) => dispatch(setHasEdited(value));

    const dispatchSetIsMultipleSelect = (value: boolean) => dispatch(setIsMultipleSelect(value));

    const dispatchSetIsGridEnabled = (value: boolean) => dispatch(setIsGridEnabled(value));

    const dispatchSetCurrentMode = (mode: ModesAvailable) => dispatch(setCurrentMode(mode));

    return {
        dispatchSetIsEditor,
        dispatchSetIsEditing,
        dispatchSetHasEditorOpened,
        dispatchSetIsGameUIPreview,
        dispatchSetHasEdited,
        dispatchSetIsMultipleSelect,
        dispatchSetIsGridEnabled,
        dispatchSetCurrentMode,
    };
};