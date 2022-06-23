import { useAppDispatch } from "@app/Core/store";
import { ModesAvailable } from "../../editorTypes";
import {
    setCurrentMode,
    setHasEditorOpened,
    setIsEditing,
    setIsEditor,
} from "../state/editorReducer";

export default () => {
    const dispatch = useAppDispatch();

    const dispatchSetIsEditor = () => dispatch(setIsEditor());

    const dispatchSetIsEditing = (value: boolean) => dispatch(setIsEditing(value));

    const dispatchSetHasEditorOpened = () => dispatch(setHasEditorOpened());

    const dispatchSetCurrentMode = (mode: ModesAvailable) => dispatch(setCurrentMode(mode));

    return {
        dispatchSetIsEditor,
        dispatchSetIsEditing,
        dispatchSetHasEditorOpened,
        dispatchSetCurrentMode,
    };
};
