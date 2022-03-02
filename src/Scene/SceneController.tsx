import React, { FC, useContext, useEffect, useState } from "react";
import { Object3D } from "three";
import Scene from "./Scene";
import useCurrentObjects from "./_Editor/state/hooks/useCurrentObjects";
import useSceneObjects from "./_Editor/state/hooks/useSceneObjects";
import EditableModeler from "./_Editor/components/EditableModeler";
import { IEditableProxy, EditableProxyContext } from "./_Editor/state/EditableProxyProvider";

const InstantiateObject = (editable: IEditableProxy): React.ReactNode => {
    return React.createElement(EditableModeler, {
        key: editable.name,
        editable,
    });
};

const SceneController: FC = () => {
    const { objects, addObjectOnScene } = useSceneObjects();
    const { editableProxies } = useContext(EditableProxyContext);
    const { currentObjects, removeCurrentObjects } = useCurrentObjects();
    const [copiedObjects, setCopiedObjects] = useState<Object3D[]>([]);

    useEffect(() => {
        window.addEventListener("keyup", handleKeyUp);

        return () => {
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, [currentObjects.length, copiedObjects, objects]);

    useEffect(() => {
        console.log(objects, "objects");
    }, [objects]);

    const handleKeyUp = (event: KeyboardEvent): void => {
        if (event.ctrlKey && event.code === "KeyC") {
            if (currentObjects.length > 0) {
                setCopiedObjects(currentObjects);
            }
        } else if (event.ctrlKey && event.code === "KeyV") {
            if (copiedObjects.length > 0) {
                copiedObjects.forEach((x) => {
                    const clonedObject = x.clone();
                    addObjectOnScene(clonedObject);
                });
            }
        } else if (event.code === "Delete") {
            if (currentObjects.length > 0) {
                removeCurrentObjects();
            }
        }
    };

    return (
        <Scene> {editableProxies.map((editableProxy) => InstantiateObject(editableProxy))} </Scene>
    );
};

export default SceneController;
