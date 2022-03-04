import { useThree } from "@react-three/fiber";
import { useContext, useEffect, useState } from "react";
import { Object3D } from "three";
import uidGenerator from "../../../../common/utils/uidGenerator";
import { EditableProxyContext } from "../EditableProxyProvider";
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

    return {
        objects,
        getObjectById: (id: string | number) => {
            return scene.children.find((x) => id === x.uuid || id === x.id);
        },
        addObjectOnScene: (object: Object3D) => {
            object.name = uidGenerator();
            addEditableProxy(object.type);
            scene.add(object);
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
