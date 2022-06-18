import { useAppDispatch, useAppSelector } from "@core/store";
import { setIsEditor } from "@editor/state/editorReducer";

export default () => {
    const dispatch = useAppDispatch();
    const { isEditor } = useAppSelector((state) => state.editor);

    return { isEditor, setIsEditor: () => dispatch(setIsEditor()) };
};
