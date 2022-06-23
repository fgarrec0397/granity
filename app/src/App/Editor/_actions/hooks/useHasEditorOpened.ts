import useEditorDispatch from "../_data/hooks/useEditorDispatch";
import useEditorSelector from "../_data/hooks/useEditorSelector";

export default () => {
    const { dispatchSetHasEditorOpened } = useEditorDispatch();
    const { hasEditorOpened } = useEditorSelector();

    return {
        hasEditorOpened,
        setHasEditorOpened: () => dispatchSetHasEditorOpened(),
    };
};
