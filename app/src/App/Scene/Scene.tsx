import * as THREE from "three";
import React, { FC, useEffect } from "react";
import { Physics } from "@react-three/cannon";
import { Select } from "@react-three/drei";
import Lights from "./components/Lights";
import CameraControls from "./components/CameraControls";
import Widgets from "../Widgets/Widgets";
import useKeyboardControls from "../Core/hooks/useKeyboardControls";
import useWidgets from "../Widgets/state/hooks/useWidgets";
import useWidgetsUtilities from "../Widgets/state/hooks/useWidgetsUtilities";
import { off, on } from "../Core/utils/events";
import { useThree } from "@react-three/fiber";

const Scene: FC = () => {
    const { scene } = useThree();
    const { selectWidget } = useWidgets();
    const { getWidgetByMesh } = useWidgetsUtilities();
    useKeyboardControls();

    useEffect(() => {
        const fetchScene = async () => {
            const response = await fetch("api/scene");
            const { sceneJsonString } = await response.json();
            console.log(response, "response");
            console.log(sceneJsonString, "sceneJsonString");
            try {
                const sceneObj = JSON.parse(sceneJsonString);
                const loader = new THREE.ObjectLoader();
                const object = loader.parse(sceneObj);
                scene.add(object);
                console.log(object);
            } catch (error) {
                console.log(error, "error");
            }
        };

        const handleSaveFile = async () => {
            const jsonScene = scene.toJSON();
            console.log(jsonScene, "onClick from scene");
            console.log(JSON.stringify(jsonScene), "JSON.stringify(jsonScene)");
            const rawResponse = await fetch("api/scene", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(jsonScene),
            });

            const content = await rawResponse.json();

            // console.log(content, "content");
        };

        fetchScene();
        console.log("after fetch");

        on("saveFile:click", handleSaveFile);

        return () => {
            off("saveFile:click", handleSaveFile);
        };
    }, [scene]);

    const onSelectMesh = (meshArray: THREE.Object3D[]) => {
        if (meshArray.length) {
            const { widget } = getWidgetByMesh(meshArray[0]);

            if (widget) {
                selectWidget(widget);
            }
        }
    };

    return (
        <Physics>
            <Lights />
            <CameraControls />
            <Select box multiple onChange={onSelectMesh} filter={(items) => items}>
                <Widgets />
            </Select>
        </Physics>
    );
};

export default Scene;
