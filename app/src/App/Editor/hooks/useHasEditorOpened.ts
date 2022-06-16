import { useAppDispatch, useAppSelector } from "../../Core/store";
import { setHasEditorOpened } from "../state/editorReducer";

export default () => {
    const dispatch = useAppDispatch();
    const { hasEditorOpened } = useAppSelector((state) => state.editor);

    return {
        hasEditorOpened,
        setHasEditorOpened: () => dispatch(setHasEditorOpened()),
    };
};
