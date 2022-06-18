import { useAppDispatch, useAppSelector } from "@core/store";
import { setIsEditing } from "@editor/state/editorReducer";

export default () => {
    const dispatch = useAppDispatch();
    const { isEditing } = useAppSelector((state) => state.editor);

    return {
        isEditing,
        setIsEditing: (value: boolean) => dispatch(setIsEditing(value)),
    };
};
