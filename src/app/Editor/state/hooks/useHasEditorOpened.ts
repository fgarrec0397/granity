import { useAppDispatch, useAppSelector } from "../../../Core/hooks";
import { setHasEditorOpened } from "../editorReducer";

export default () => {
    const dispatch = useAppDispatch();
    const { hasEditorOpened } = useAppSelector((state) => state.editor);

    return {
        hasEditorOpened,
        setHasEditorOpened: () => dispatch(setHasEditorOpened()),
    };
};
