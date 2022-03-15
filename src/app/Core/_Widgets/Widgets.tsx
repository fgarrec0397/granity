import React, { FC } from "react";
import EditableModeler from "../../Editor/components/EditableModeler";
import { IEditableProxy } from "../../Editor/state/EditableProxyProvider";
import useEditableProxies from "../../Editor/state/hooks/useEditableProxies";
// import widgets from "../../extractor";

const InstantiateObject = (editable: IEditableProxy): React.ReactNode => {
    return React.createElement(EditableModeler, {
        key: editable.name,
        editable,
    });
};

const Widgets: FC = () => {
    const { editableProxies } = useEditableProxies();
    // console.log(widgets, "widgets from Widgets");
    return <>{editableProxies.map((editableProxy) => InstantiateObject(editableProxy))}</>;
};

export default Widgets;
