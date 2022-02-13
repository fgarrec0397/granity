import { Canvas } from "@react-three/fiber"
import React, { FC } from "react"
import EditorController from "./Scene/_Editor/EditorController"
import StoreProvider from "./store/StoreProvider"
import SceneController from "./Scene/SceneController"

const CanvasComponent: FC = () => {
    return (
        <>
            <Canvas camera={{ fov: 25 }}>
                <StoreProvider>
                    <SceneController />
                </StoreProvider>
            </Canvas>
            <EditorController />
        </>
    )
}

export default CanvasComponent
