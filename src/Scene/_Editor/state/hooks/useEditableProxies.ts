import { useContext } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { EditableProxyContext, IEditableProxy } from "../EditableProxyProvider";
import { setCurrentProxy } from "../editorReducer";

export default () => {
    const dispatch = useAppDispatch();
    const { currentProxy } = useAppSelector((state) => state.editor);
    const { editableProxies, setEditableProxies } = useContext(EditableProxyContext);

    return {
        currentProxy,
        editableProxies,
        addEditableProxy: (type: string) => {
            const name = `${type} ${editableProxies.length}`;

            setEditableProxies([
                ...editableProxies,
                {
                    name,
                    type,
                },
            ]);
        },
        updateCurrentProxy: (editableProxy: IEditableProxy) => {
            dispatch(setCurrentProxy(editableProxy));
        },
        removeProxy: (editableProxy: IEditableProxy) => {
            const updatedEditableProxies = editableProxies.filter(
                (x) => x.name === editableProxy.name
            );
            setEditableProxies(updatedEditableProxies);
        },
    };
};
