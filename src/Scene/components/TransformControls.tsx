// @ts-ignore
import { TransformControls } from "three/examples/jsm/controls/TransformControls";
import { useThree } from "@react-three/fiber";
import React, { FC, useContext, useEffect, useState } from "react";
import useCurrentElement from "../_Editor/state/hooks/useCurrentElement";
import useCurrentMode from "../_Editor/state/hooks/useCurrentMode";
import useIsEditing from "../_Editor/state/hooks/useIsEditing";
import { MeshContext } from "../state/MeshContextProvider";
import useElementsOnScene from "../_Editor/state/hooks/useElementsOnScene";

const TransformControlsComponent: FC = ({ children }) => {
    const { meshes } = useContext(MeshContext);
    const { currentElement, updateCurrentElement } = useCurrentElement();
    const { elementsOnScene } = useElementsOnScene();
    const { currentMode } = useCurrentMode();
    const { setIsEditing } = useIsEditing();
    const { camera, gl, scene } = useThree();
    const [transformControl, setTransformControl] = useState<TransformControls>();

    /**
     * Instantiate TransformControls class, attach a mesh and add it to the scene
     */

    useEffect(() => {
        if (!transformControl && currentElement) {
            const transformC = new TransformControls(camera, gl.domElement);
            const mesh = meshes.find((x) => x.uuid === currentElement?.meshuuid);

            transformC.attach(mesh);
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
    }, [transformControl, camera, scene, gl, currentElement?.meshId]);

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
    }, [transformControl, currentElement?.meshId, elementsOnScene]);

    /**
     * Detach the transformControl whenever the current element change
     */

    useEffect(() => {
        if (transformControl) {
            transformControl.detach();
        }
    }, [currentElement?.id]);

    /**
     * Update the transformControl mode when the currentMode changes
     */

    useEffect(() => {
        if (transformControl) {
            transformControl.setMode(currentMode);
        }
    }, [currentMode]);

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
        const mesh = meshes.find((x) => x.uuid === currentElement?.meshuuid);
        updateCurrentElement({
            position: mesh.position,
            rotation: mesh.rotation,
            scale: mesh.scale,
        });
    };

    return <>{children}</>;
};

export default TransformControlsComponent;
