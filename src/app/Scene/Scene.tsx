import React, { FC, useEffect, useState } from "react";
import { Object3D } from "three";
import { Physics } from "@react-three/cannon";
import useCurrentObjects from "../Editor/state/hooks/useCurrentObjects";
import useSceneObjects from "../Editor/state/hooks/useSceneObjects";
import Lights from "./components/Lights";
import CameraControls from "./components/CameraControls";
import Widgets from "../Core/_Widgets/Widgets";

const Scene: FC = () => {
    const { objects, copyObject } = useSceneObjects();
    const { currentObjects, removeCurrentObjects } = useCurrentObjects();
    const [copiedObjects, setCopiedObjects] = useState<Object3D[]>([]);

    useEffect(() => {
        window.addEventListener("keyup", handleKeyUp);

        return () => {
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, [currentObjects.length, currentObjects[0]?.id, copiedObjects, objects]);

    const handleKeyUp = (event: KeyboardEvent): void => {
        if (event.ctrlKey && event.code === "KeyC") {
            if (currentObjects.length > 0) {
                setCopiedObjects(currentObjects);
            }
        } else if (event.ctrlKey && event.code === "KeyV") {
            if (copiedObjects.length > 0) {
                copiedObjects.forEach((x) => {
                    copyObject(x);
                });
            }
        } else if (event.code === "Delete") {
            if (currentObjects.length > 0) {
                removeCurrentObjects();
            }
        }
    };

    // TODO -- Wrap elements with <Physics></Physics>

    return (
        <>
            <Lights />
            <CameraControls />
            <Widgets />
        </>
    );
};

export default Scene;
