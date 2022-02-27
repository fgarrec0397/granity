import { Canvas } from "@react-three/fiber";
import React, { FC } from "react";
import { useContextBridge } from "@react-three/drei";
import { ReactReduxContext } from "react-redux";
import EditorController from "./Scene/_Editor/EditorController";
import SceneController from "./Scene/SceneController";
import { EditableProxyContext } from "./Scene/_Editor/state/EditableProxyProvider";

const CanvasComponent: FC = () => {
    const ContextBridge = useContextBridge(EditableProxyContext, ReactReduxContext);
    return (
        <>
            <Canvas camera={{ fov: 25 }}>
                <ContextBridge>
                    <SceneController />
                </ContextBridge>
            </Canvas>
            <EditorController />
        </>
    );
};

export default CanvasComponent;
