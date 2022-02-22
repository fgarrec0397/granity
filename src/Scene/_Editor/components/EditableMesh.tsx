// @ts-ignore
import * as THREE from "three";
import { MeshProps, ThreeEvent, useThree } from "@react-three/fiber";
import React, { FC, RefObject, useEffect, useState } from "react";
import useCurrentElement from "../state/hooks/useCurrentElement";
import useIsEditor from "../state/hooks/useIsEditor";
import { SceneElement } from "../state/types";
import useElementsOnScene from "../state/hooks/useElementsOnScene";

interface Props extends MeshProps {
    geometryRef?: RefObject<THREE.Object3D>;
    sceneElement: SceneElement;
}

const hoveredColor = "#bdbdf5";

const EditableMesh: FC<Props> = ({ geometryRef, sceneElement, children }) => {
    const [hovered, setHover] = useState(false);
    const { currentElement, currentElements, setCurrentElement } = useCurrentElement();
    const { elementsOnScene, setElementsOnScene } = useElementsOnScene();
    const { isEditor } = useIsEditor();
    const { mouse, camera, raycaster, scene } = useThree();

    /**
     * Initialize mouse event to select mesh.
     * Updated each time elementsOnScene is modified to keep the state up to date
     */

    // useEffect(() => {
    //     window.addEventListener("mouseup", onMouseUp);

    //     return () => {
    //         window.removeEventListener("mouseup", onMouseUp);
    //     };
    // }, [elementsOnScene, currentElement, currentElements.length]);

    /**
     * Bind the mesh id to the scene element
     */

    useEffect(() => {
        if (geometryRef?.current.uuid) {
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

    // const onMouseUp = (event: MouseEvent): void => {
    //     event.preventDefault();

    //     const isMultipleSelect = event.ctrlKey;

    //     mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    //     mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    //     raycaster.setFromCamera(mouse, camera);
    //     console.log(scene.children, "scene.children from editable");
    //     const intersects = raycaster.intersectObjects(scene.children);

    //     console.log(intersects, "intersects");
    //     if (intersects.length > 0) {
    //         const [closestMesh] = intersects.sort((x: any) => x.distance);
    //         console.log(closestMesh, "closestMesh");
    //         setCurrentElement(closestMesh.object.uuid, isMultipleSelect);
    //     }
    // };

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
