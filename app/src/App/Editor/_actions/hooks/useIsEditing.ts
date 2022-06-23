import useEditorSelector from "../_data/hooks/useEditorSelector";
import useDispatchEditor from "../_data/hooks/useEditorDispatch";

export default () => {
    const { isEditing } = useEditorSelector();
    const { dispatchSetIsEditing } = useDispatchEditor();

    const setIsEditing = (value: boolean) => dispatchSetIsEditing(value);

    return {
        isEditing,
        setIsEditing,
    };
};
