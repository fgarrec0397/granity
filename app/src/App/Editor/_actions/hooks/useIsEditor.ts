import useEditorDispatch from "../_data/hooks/useEditorDispatch";
import useEditorSelector from "../_data/hooks/useEditorSelector";

export default () => {
    const { dispatchSetIsEditor } = useEditorDispatch();
    const { isEditor } = useEditorSelector();

    return { isEditor, setIsEditor: () => dispatchSetIsEditor() };
};
