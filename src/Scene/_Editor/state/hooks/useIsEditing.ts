import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { setIsEditing } from "../editorReducer";

export default () => {
    const dispatch = useAppDispatch();
    const { isEditing } = useAppSelector((state) => state.editor);

    return { isEditing, setIsEditing: () => dispatch(setIsEditing()) };
};
