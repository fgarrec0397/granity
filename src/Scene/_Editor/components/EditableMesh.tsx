// @ts-ignore
import * as THREE from "three";
import { MeshProps, ThreeEvent, useThree } from "@react-three/fiber";
import React, { FC, RefObject, useEffect, useState } from "react";
import mapMeshToCurrentElement from "../../../common/utils/mapMeshToCurrentElement";
import useCurrentElement from "../state/hooks/useCurrentElement";
import useIsEditor from "../state/hooks/useIsEditor";
import { SceneElement } from "../state/types";

interface Props extends MeshProps {
    geometryRef?: RefObject<THREE.Object3D>;
    sceneElement: SceneElement;
}

const hoveredColor = "#bdbdf5";

const EditableMesh: FC<Props> = ({ geometryRef, sceneElement, children, ...meshProps }) => {
    const [hovered, setHover] = useState(false);
    const { currentElement, setCurrentElement } = useCurrentElement();
    const { isEditor } = useIsEditor();
    const { mouse, camera, raycaster, scene } = useThree();

    useEffect(() => {
        window.addEventListener("mouseup", onMouseUp);

        return () => {
            window.removeEventListener("mouseup", onMouseUp);
        };
    }, []);

    const onMouseUp = (event: MouseEvent): void => {
        event.preventDefault();
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);

        const intersects = raycaster.intersectObjects(scene.children);

        if (intersects.length > 0) {
            const [closestMesh] = intersects.sort((x: any) => x.distance);
            setCurrentElement(mapMeshToCurrentElement(closestMesh.object, sceneElement.component));
        }
    };

    const handleOnPointerOver = (event: ThreeEvent<PointerEvent>): void => {
        event.stopPropagation();
        setHover(true);
    };

    const handleOnPointerOut = (event: ThreeEvent<PointerEvent>): void => {
        event.stopPropagation();
        setHover(false);
    };

    const removeIdFromSceneElement = () => {
        const copyElement = { ...sceneElement };
        delete copyElement.id;

        return copyElement;
    };

    return (
        <mesh
            ref={geometryRef}
            onPointerOver={handleOnPointerOver}
            onPointerOut={handleOnPointerOut}
            {...removeIdFromSceneElement()}
        >
            {children}
            <meshStandardMaterial
                color={
                    (hovered || currentElement?.name === meshProps.name) && isEditor
                        ? hoveredColor
                        : "white"
                }
            />
        </mesh>
    );
};

export default EditableMesh;
