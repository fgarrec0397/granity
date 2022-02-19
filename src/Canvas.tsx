import { Canvas } from "@react-three/fiber";
import React, { FC } from "react";
import EditorController from "./Scene/_Editor/EditorController";
import StoreProvider from "./app/StoreProvider";
import SceneController from "./Scene/SceneController";
import MeshContextProvider from "./Scene/state/MeshContextProvider";

const CanvasComponent: FC = () => {
    return (
        <>
            <Canvas camera={{ fov: 25 }}>
                <StoreProvider>
                    <MeshContextProvider>
                        <SceneController />
                    </MeshContextProvider>
                </StoreProvider>
            </Canvas>
            <EditorController />
        </>
    );
};

export default CanvasComponent;
