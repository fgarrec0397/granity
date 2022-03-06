import { TransformControls } from "three/examples/jsm/controls/TransformControls";
import { useThree } from "@react-three/fiber";
import React, { FC, useEffect, useState } from "react";
import { Group, Mesh, Object3D } from "three";
import useCurrentElement from "../_Editor/state/hooks/useCurrentObjects";
import useCurrentMode from "../_Editor/state/hooks/useCurrentMode";
import useIsEditing from "../_Editor/state/hooks/useIsEditing";
import useCurrentProxy from "../_Editor/state/hooks/useEditableProxies";
import serializeVector3 from "../../common/utils/serializeVector3";

const TransformControlsComponent: FC = ({ children }) => {
    const { currentObjects, setCurrentObjects } = useCurrentElement();
    const { updateCurrentProxy } = useCurrentProxy();
    const { currentMode } = useCurrentMode();
    const { setIsEditing, isEditing } = useIsEditing();
    const { mouse, camera, raycaster, scene, gl } = useThree();
    const [transformControl, setTransformControl] = useState<TransformControls>();
    const [stateMesh, setStateMesh] = useState<Object3D>();
    const [temporaryGroup, setTemporaryGroup] = useState<Group>();

    /**
     * Instantiate TransformControls class, attach a mesh and add it to the scene
     */

    useEffect(() => {
        if (!transformControl && stateMesh) {
            const transformC = new TransformControls(camera, gl.domElement);
            transformC.attach(stateMesh);
            transformC.setMode(currentMode);

            scene.add(transformC);
            setTransformControl(transformC);
        }

        return () => {
            if (transformControl) {
                scene.remove(transformControl);
                setTransformControl(undefined);
            }
        };
    }, [transformControl, camera, scene, gl, stateMesh]);

    useEffect(() => {
        window.addEventListener("mouseup", onMouseUp);

        return () => {
            window.removeEventListener("mouseup", onMouseUp);
        };
    }, [scene.children.length, currentObjects.length, temporaryGroup]);

    useEffect(() => {
        if (currentObjects.length > 1 && transformControl) {
            const group = new Group();

            currentObjects.forEach((x) => {
                group.add(x);
            });

            setTemporaryGroup(group);
            scene.add(group);
            setStateMesh(group);
        } else {
            setStateMesh(currentObjects[0]);
        }
    }, [currentObjects]);

    /**
     * Initialize events on transformControls.
     * Updated each time elementsOnScene is modified to keep the state updated
     */

    useEffect(() => {
        transformControl?.addEventListener("dragging-changed", onDraggingChangedHandler);
        transformControl?.addEventListener("objectChange", onObjectChangeHandler);

        return () => {
            transformControl?.removeEventListener("dragging-changed", onDraggingChangedHandler);
            transformControl?.removeEventListener("objectChange", onObjectChangeHandler);
        };
    }, [transformControl, currentObjects.length]);

    /**
     * Detach the transformControl whenever the current element change
     */

    useEffect(() => {
        if (transformControl) {
            transformControl.detach();
        }
    }, [currentObjects.length, currentObjects[0]?.id, temporaryGroup]);

    /**
     * Update the transformControl mode when the currentMode changes
     */

    useEffect(() => {
        if (transformControl) {
            transformControl.setMode(currentMode);
        }
    }, [currentMode]);

    /**
     * Raycast the closest element and select it as the current element
     * @param event
     */

    const onMouseUp = (event: MouseEvent): void => {
        event.preventDefault();

        const isMultipleSelect = event.ctrlKey;

        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);

        const intersects = raycaster.intersectObjects([...scene.children]);

        if (intersects.length > 0) {
            const [closestMesh] = intersects.sort((x: any) => x.distance);
            setCurrentObjects(closestMesh.object.uuid, isMultipleSelect);
        } else if (temporaryGroup && !isEditing) {
            const grouppedMeshes: any = [];

            temporaryGroup.children.forEach((child: any) => {
                if (child) {
                    grouppedMeshes.push(child);
                    scene.remove(child);
                }
            });

            grouppedMeshes.forEach((mesh: any) => {
                scene.attach(mesh);
            });

            setTemporaryGroup(undefined);
            scene.remove(temporaryGroup);
        }
    };

    /**
     * Change isEditing value based on the dragging-changed event
     * @param event
     */

    const onDraggingChangedHandler = ({ value }: any) => {
        setIsEditing(value);
    };

    /**
     * Update the currentElement based on the mesh properties
     */

    const onObjectChangeHandler = () => {
        if (stateMesh) {
            updateCurrentProxy({
                name: stateMesh.name,
                type: stateMesh.type,
                position: serializeVector3(stateMesh.position),
                rotation: serializeVector3(stateMesh.rotation),
                scale: serializeVector3(stateMesh.scale),
            });
        }
    };

    return <>{children}</>;
};

export default TransformControlsComponent;
