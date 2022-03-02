import { useThree } from "@react-three/fiber";
import { useContext, useEffect, useState } from "react";
import { Object3D } from "three";
import uidGenerator from "../../../../common/utils/uidGenerator";
import { EditableProxyContext } from "../EditableProxyProvider";

export interface ObjectDefinition {
    name: string;
    type: string;
}

export default () => {
    const { scene } = useThree();
    // const { editableProxies, setEditableProxies } = useContext(EditableProxyContext);
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
            scene.add(object);
        },
        removeObjectFromScene: (object: Object3D) => {
            // TODO -- Remove element from Proxy
            scene.remove(object);
        },
        removeObjectsArrayFromScene: (objectsArray: Object3D[]) => {
            objectsArray.forEach((x) => {
                scene.remove(x);
            });
        },
    };
};
