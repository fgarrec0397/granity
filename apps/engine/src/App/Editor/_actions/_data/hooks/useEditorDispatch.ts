import { useAppDispatch } from "@app/Core/_actions/_data/state/store";

import { ModesAvailable } from "../../editorTypes";
import {
    setCurrentMode,
    setHasEdited,
    setHasEditorOpened,
    setIsEditing,
    setIsEditor,
    setIsGameUIPreview,
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

    const dispatchSetCurrentMode = (mode: ModesAvailable) => dispatch(setCurrentMode(mode));

    return {
        dispatchSetIsEditor,
        dispatchSetIsEditing,
        dispatchSetHasEditorOpened,
        dispatchSetIsGameUIPreview,
        dispatchSetHasEdited,
        dispatchSetIsMultipleSelect,
        dispatchSetCurrentMode,
    };
};
