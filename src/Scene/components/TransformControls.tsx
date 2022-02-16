// @ts-ignore
import { TransformControls } from "three/examples/jsm/controls/TransformControls";
import { useThree } from "@react-three/fiber";
import React, { FC, useEffect, useState } from "react";
import mapMeshToCurrentElement from "../../common/utils/mapMeshToCurrentElement";
import useCurrentElement from "../_Editor/state/hooks/useCurrentElement";
import useCurrentMode from "../_Editor/state/hooks/useCurrentMode";
import useIsEditing from "../_Editor/state/hooks/useIsEditing";
import useElementsOnScene from "../_Editor/state/hooks/useElementsOnScene";

const TransformControlsComponent: FC = ({ children }) => {
    const { currentElement, setCurrentElement } = useCurrentElement();
    const { currentMode } = useCurrentMode();
    const { elementsOnScene } = useElementsOnScene();
    const { setIsEditing } = useIsEditing();
    const { camera, gl, scene } = useThree();
    const [transformControl, setTransformControl] =
        useState<TransformControls>();

    // const getMesh = (id: string) => {
    //     // elementsOnScene.find((x) => x.id === id);
    //     // TODO -- continue here: Match the mesh with the given id
    //     console.log(scene, "scene");
    //     const clone = scene.clone();
    //     clone.traverse((object: any) => {
    //         console.log(object, "object");
    //     });
    // };

    useEffect(() => {
        if (!transformControl && currentElement) {
            const transformC = new TransformControls(camera, gl.domElement);
            // console.log(getMesh(currentElement.id));
            transformC.attach(currentElement.mesh);
            transformC.setMode(currentMode);

            transformC.addEventListener(
                "dragging-changed",
                ({ value }: any) => {
                    setIsEditing(value);
                }
            );

            transformC.addEventListener("objectChange", () => {
                // Choose between "objectChange" and "dragging-changed"
                setCurrentElement(mapMeshToCurrentElement(currentElement.mesh));
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
    }, [transformControl, camera, scene, gl, currentElement?.mesh]);

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
