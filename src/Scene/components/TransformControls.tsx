// @ts-ignore
import { TransformControls } from "three/examples/jsm/controls/TransformControls";
import { useThree } from "@react-three/fiber";
import React, { FC, useContext, useEffect, useState } from "react";
import useCurrentElement from "../_Editor/state/hooks/useCurrentElement";
import useCurrentMode from "../_Editor/state/hooks/useCurrentMode";
import useIsEditing from "../_Editor/state/hooks/useIsEditing";
import { MeshContext } from "../state/MeshContextProvider";

const TransformControlsComponent: FC = ({ children }) => {
    const { meshes } = useContext(MeshContext);
    const { currentElement, updateCurrentElement } = useCurrentElement();
    const { currentMode } = useCurrentMode();
    const { setIsEditing } = useIsEditing();
    const { camera, gl, scene } = useThree();
    const [transformControl, setTransformControl] = useState<TransformControls>();

    useEffect(() => {
        if (!transformControl && currentElement) {
            const transformC = new TransformControls(camera, gl.domElement);
            const mesh = meshes.find((x) => x.uuid === currentElement?.meshuuid);

            transformC.attach(mesh);
            transformC.setMode(currentMode);

            transformC.addEventListener("dragging-changed", ({ value }: any) => {
                setIsEditing(value);
            });

            transformC.addEventListener("objectChange", () => {
                updateCurrentElement({
                    position: mesh.position,
                    rotation: mesh.rotation,
                    scale: mesh.scale,
                });
            });

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

    useEffect(() => {
        if (transformControl) {
            transformControl.detach();
        }
    }, [currentElement?.id]);

    useEffect(() => {
        if (transformControl) {
            transformControl.setMode(currentMode);
        }
    }, [currentMode]);

    return <>{children}</>;
};

export default TransformControlsComponent;
