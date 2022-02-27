import React, { FC, useContext, useEffect, useState } from "react";
import { useThree } from "@react-three/fiber";
import { Object3D } from "three";
import Scene from "./Scene";
import useCurrentElement from "./_Editor/state/hooks/useCurrentObjects";
import uidGenerator from "../common/utils/uidGenerator";
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
    const { objects } = useSceneObjects();
    const { scene } = useThree();
    const { editableProxies } = useContext(EditableProxyContext);
    const { currentObjects, removeCurrentObjects } = useCurrentElement();
    const [copiedObjects, setCopiedObjects] = useState<Object3D[]>([]);

    useEffect(() => {
        window.addEventListener("keyup", handleKeyUp);

        return () => {
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, [currentObjects.length, copiedObjects, objects]);

    const handleKeyUp = (event: KeyboardEvent): void => {
        if (event.ctrlKey && event.code === "KeyC") {
            if (currentObjects.length > 0) {
                setCopiedObjects(currentObjects);
            }
        } else if (event.ctrlKey && event.code === "KeyV") {
            if (copiedObjects.length > 0) {
                copiedObjects.forEach((x) => {
                    const clonedObject = x.clone();
                    clonedObject.name = uidGenerator();

                    scene.add(clonedObject);
                });
            }
        } else if (event.code === "Delete") {
            if (currentObjects.length > 0) {
                removeCurrentObjects();
                currentObjects.forEach((x) => {
                    scene.remove(x);
                });
            }
        }
    };

    return (
        <Scene> {editableProxies.map((editableProxy) => InstantiateObject(editableProxy))} </Scene>
    );
};

export default SceneController;
