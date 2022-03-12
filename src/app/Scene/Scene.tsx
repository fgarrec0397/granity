import React, { FC, useEffect, useState } from "react";
import { Object3D } from "three";
import { Physics } from "@react-three/cannon";
import useCurrentObjects from "../Editor/state/hooks/useCurrentObjects";
import useSceneObjects from "../Editor/state/hooks/useSceneObjects";
import EditableModeler from "../Editor/components/EditableModeler";
import { IEditableProxy } from "../Editor/state/EditableProxyProvider";
import useEditableProxies from "../Editor/state/hooks/useEditableProxies";
import Lights from "./components/Lights";
import CameraControls from "./components/CameraControls";

const InstantiateObject = (editable: IEditableProxy): React.ReactNode => {
    return React.createElement(EditableModeler, {
        key: editable.name,
        editable,
    });
};

const SceneController: FC = () => {
    const { objects, copyObject } = useSceneObjects();
    const { editableProxies } = useEditableProxies();
    const { currentObjects, removeCurrentObjects } = useCurrentObjects();
    const [copiedObjects, setCopiedObjects] = useState<Object3D[]>([]);

    useEffect(() => {
        window.addEventListener("keyup", handleKeyUp);

        return () => {
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, [currentObjects.length, currentObjects[0]?.id, copiedObjects, objects]);

    const handleKeyUp = (event: KeyboardEvent): void => {
        if (event.ctrlKey && event.code === "KeyC") {
            if (currentObjects.length > 0) {
                setCopiedObjects(currentObjects);
            }
        } else if (event.ctrlKey && event.code === "KeyV") {
            if (copiedObjects.length > 0) {
                copiedObjects.forEach((x) => {
                    copyObject(x);
                });
            }
        } else if (event.code === "Delete") {
            if (currentObjects.length > 0) {
                removeCurrentObjects();
            }
        }
    };

    // TODO -- Wrap elements with <Physics></Physics>

    return (
        <>
            <Lights />
            <CameraControls />
            {editableProxies.map((editableProxy) => InstantiateObject(editableProxy))}{" "}
        </>
    );
};

export default SceneController;
