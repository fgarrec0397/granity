import { useThree } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { Mesh, Object3D } from "three";
import serializeVector3 from "../../../../common/utils/serializeVector3";
import uidGenerator from "../../../../common/utils/uidGenerator";
import { IEditableProxy } from "../EditableProxyProvider";
import useEditableProxies from "./useEditableProxies";

export interface ObjectDefinition {
    name: string;
    type: string;
}

export default () => {
    const { scene } = useThree();
    const { addEditableProxy, removeProxy } = useEditableProxies();
    const [objects, setObjects] = useState<Object3D[]>([]);

    useEffect(() => {
        setObjects(scene.children);
    }, [scene.children.length]);

    const addObjectOnScene = (
        object: Object3D,
        additionalProperties?: Pick<IEditableProxy, "type" | "position" | "rotation" | "scale">
    ) => {
        object.name = uidGenerator();
        addEditableProxy(object.type, additionalProperties);
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
            removeProxy(object.name);
            scene.remove(object);
        },
        removeObjectsArrayFromScene: (objectsArray: Object3D[]) => {
            objectsArray.forEach((x) => {
                removeProxy(x.name);
                scene.remove(x);
            });
        },
    };
};
