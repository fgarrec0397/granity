import useDispatchEditor from "../_data/hooks/useEditorDispatch";
import useEditorSelector from "../_data/hooks/useEditorSelector";

export default () => {
    const { isEditing } = useEditorSelector();
    const { dispatchSetIsEditing } = useDispatchEditor();

    const setIsEditing = (value: boolean) => dispatchSetIsEditing(value);

    return {
        isEditing,
        setIsEditing,
    };
};
