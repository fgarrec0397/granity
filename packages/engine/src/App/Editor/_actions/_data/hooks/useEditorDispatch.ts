import { useAppDispatch } from "@engine/App/Core/_actions/_data/state/store";

import { EditorModesAvailable, EditorStatus } from "../../editorConstants";
import {
    setCurrentMode,
    setEditorStatus,
    setHasEdited,
    setHasEditorOpened,
    setIsEditing,
    setIsGridEnabled,
    setIsMultipleSelect,
} from "../state/editorReducer";

export default () => {
    const dispatch = useAppDispatch();

    const dispatchSetEditorStatus = (value: EditorStatus) => dispatch(setEditorStatus(value));

    const dispatchSetIsEditing = (value: boolean) => dispatch(setIsEditing(value));

    const dispatchSetHasEditorOpened = () => dispatch(setHasEditorOpened());

    const dispatchSetHasEdited = (value: boolean) => dispatch(setHasEdited(value));

    const dispatchSetIsMultipleSelect = (value: boolean) => dispatch(setIsMultipleSelect(value));

    const dispatchSetIsGridEnabled = (value: boolean) => dispatch(setIsGridEnabled(value));

    const dispatchSetCurrentMode = (mode: EditorModesAvailable) => dispatch(setCurrentMode(mode));

    return {
        dispatchSetEditorStatus,
        dispatchSetIsEditing,
        dispatchSetHasEditorOpened,
        dispatchSetHasEdited,
        dispatchSetIsMultipleSelect,
        dispatchSetIsGridEnabled,
        dispatchSetCurrentMode,
    };
};
