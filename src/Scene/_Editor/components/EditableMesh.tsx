// @ts-ignore
import * as THREE from "three";
import { MeshProps, ThreeEvent, useThree } from "@react-three/fiber";
import React, { FC, RefObject, useContext, useEffect, useState } from "react";
import useCurrentElement from "../state/hooks/useCurrentElement";
import useIsEditor from "../state/hooks/useIsEditor";
import { SceneElement } from "../state/types";
import useElementsOnScene from "../state/hooks/useElementsOnScene";
import { MeshContext } from "../../state/MeshContextProvider";

interface Props extends MeshProps {
    geometryRef?: RefObject<THREE.Object3D>;
    sceneElement: SceneElement;
}

const hoveredColor = "#bdbdf5";

const EditableMesh: FC<Props> = ({ geometryRef, sceneElement, children }) => {
    const { meshes, setMeshes } = useContext(MeshContext);
    const [hovered, setHover] = useState(false);
    const { currentElement, setCurrentElement } = useCurrentElement();
    const { elementsOnScene, setElementsOnScene } = useElementsOnScene();
    const { isEditor } = useIsEditor();
    const { mouse, camera, raycaster, scene } = useThree();

    /**
     * Initialize mouse event to select mesh.
     * Updated each time elementsOnScene is modified to keep the state up to date
     */

    useEffect(() => {
        window.addEventListener("mouseup", onMouseUp);

        return () => {
            window.removeEventListener("mouseup", onMouseUp);
        };
    }, [elementsOnScene, currentElement]);

    /**
     * Bind the mesh id to the scene element
     */

    useEffect(() => {
        if (geometryRef?.current.uuid) {
            if (setMeshes) setMeshes([...meshes, geometryRef?.current]);

            const element = {
                ...sceneElement,
                meshuuid: geometryRef.current?.uuid,
                meshId: geometryRef.current?.id,
            };

            setElementsOnScene(element);
        }
    }, [geometryRef?.current?.uuid]);

    /**
     * Raycast the closest element and select it as the current element
     * @param event
     */

    const onMouseUp = (event: MouseEvent): void => {
        event.preventDefault();
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);

        const intersects = raycaster.intersectObjects(scene.children);

        if (intersects.length > 0) {
            const [closestMesh] = intersects.sort((x: any) => x.distance);
            setCurrentElement(closestMesh.object.uuid);
        }
    };

    /**
     * Remove unwanted property of the scene element object.
     * @returns a copy of a scene element object without readyonly properties
     */

    const removeIdFromSceneElement = () => {
        const copyElement = { ...sceneElement } as any;
        delete copyElement.id;
        delete copyElement.component;
        delete copyElement.mesh;
        delete copyElement.rotation; // TODO - make sure we can pass this property without fucking the apps

        return copyElement;
    };

    const handleOnPointerOver = (event: ThreeEvent<PointerEvent>): void => {
        event.stopPropagation();
        setHover(true);
    };

    const handleOnPointerOut = (event: ThreeEvent<PointerEvent>): void => {
        event.stopPropagation();
        setHover(false);
    };

    return (
        <mesh
            ref={geometryRef}
            onPointerOver={handleOnPointerOver}
            onPointerOut={handleOnPointerOut}
            {...removeIdFromSceneElement()}
        >
            {children}
            <meshStandardMaterial color={hovered && isEditor ? hoveredColor : "white"} />
        </mesh>
    );
};

export default EditableMesh;
