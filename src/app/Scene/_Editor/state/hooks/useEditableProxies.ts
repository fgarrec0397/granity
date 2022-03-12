import { useContext } from "react";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { EditableProxyContext, IEditableProxy } from "../EditableProxyProvider";
import { setCurrentProxy } from "../editorReducer";

export default () => {
    const dispatch = useAppDispatch();
    const { currentProxy } = useAppSelector((state) => state.editor);
    const { editableProxies, setEditableProxies } = useContext(EditableProxyContext);

    return {
        currentProxy,
        editableProxies,
        addEditableProxy: (
            type: string,
            additionalProperties?: Pick<IEditableProxy, "position" | "rotation" | "scale">
        ) => {
            const name = `${type} ${editableProxies.length}`;

            const newEditable: IEditableProxy = {
                name,
                type,
                position: [0, 0, 0],
                rotation: [0, 0, 0],
                scale: [1, 1, 1],
                ...additionalProperties,
            };

            setEditableProxies([...editableProxies, newEditable]);
        },
        updateCurrentProxy: (editableProxy: IEditableProxy) => {
            dispatch(setCurrentProxy(editableProxy));
        },
        removeProxy: (name: string) => {
            const updatedEditableProxies = editableProxies.filter((x) => x.name === name);
            setEditableProxies(updatedEditableProxies);
        },
    };
};
