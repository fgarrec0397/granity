import { useAppDispatch, useAppSelector } from "@core/store";
import { setHasEditorOpened } from "@editor/state/editorReducer";

export default () => {
    const dispatch = useAppDispatch();
    const { hasEditorOpened } = useAppSelector((state) => state.editor);

    return {
        hasEditorOpened,
        setHasEditorOpened: () => dispatch(setHasEditorOpened()),
    };
};
