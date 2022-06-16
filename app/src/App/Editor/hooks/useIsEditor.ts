import { useAppDispatch, useAppSelector } from "../../Core/store";
import { setIsEditor } from "../state/editorReducer";

export default () => {
    const dispatch = useAppDispatch();
    const { isEditor } = useAppSelector((state) => state.editor);

    return { isEditor, setIsEditor: () => dispatch(setIsEditor()) };
};
