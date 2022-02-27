import { useThree } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { Object3D } from "three";

export interface ObjectDefinition {
    name: string;
    type: string;
}

export default () => {
    const { scene } = useThree();
    const [objects, setObjects] = useState<Object3D[]>([]);

    useEffect(() => {
        setObjects(scene.children);
    }, [scene.children.length]);

    return {
        objects,
        getObjectById: (id: string | number) => {
            return scene.children.find((x) => id === x.uuid || id === x.id);
        },
    };
};
