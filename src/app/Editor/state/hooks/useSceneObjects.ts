import { useThree } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { Mesh, Object3D } from "three";
import serializeVector3 from "../../../Common/utils/serializeVector3";
import uidGenerator from "../../../Common/utils/uidGenerator";
import { IEditableProxy } from "../EditableProxyProvider";
import useWidgets from "./useWidgets";

export interface ObjectDefinition {
    name: string;
    type: string;
}

export default () => {
    const { scene } = useThree();
    const { addWidget, removeWidget } = useWidgets();
    const [objects, setObjects] = useState<Object3D[]>([]);

    useEffect(() => {
        setObjects(scene.children);
    }, [scene.children.length]);

    const addObjectOnScene = (
        object: Object3D,
        additionalProperties?: Pick<IEditableProxy, "type" | "position" | "rotation" | "scale">
    ) => {
        console.warn("addObjectOnScene doesnt work for now");
    };

    return {
        objects,
        addObjectOnScene,
        getObjectById: (id: string | number) => {
            return scene.children.find((x) => id === x.uuid || id === x.id);
        },
        copyObject: (object: Object3D) => {
            const clonedObject = object.clone();
            const { type } = (clonedObject as Mesh).geometry;

            addObjectOnScene(clonedObject, {
                type,
                position: serializeVector3(clonedObject.position),
                rotation: serializeVector3(clonedObject.rotation),
                scale: serializeVector3(clonedObject.scale),
            });
        },
        removeObjectFromScene: (object: Object3D) => {
            removeWidget(object.name);
            scene.remove(object);
        },
        removeObjectsArrayFromScene: (objectsArray: Object3D[]) => {
            objectsArray.forEach((x) => {
                removeWidget(x.name);
                scene.remove(x);
            });
        },
    };
};
