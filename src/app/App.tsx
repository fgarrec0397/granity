import React, { FC, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { useContextBridge } from "@react-three/drei";
import { ReactReduxContext } from "react-redux";
import Loader from "./Common/components/Loader";
import Editor from "./Editor/Editor";
import Scene from "./Scene/Scene";
import { EditableProxyContext } from "./Editor/state/EditableProxyProvider";
import { useAppSelector } from "./Core/store";
import { WidgetsContext } from "./Editor/state/WidgetsProvider";

const App: FC = () => {
    const [isLoading, setIsLoading] = useState(true);
    const ContextBridge = useContextBridge(EditableProxyContext, WidgetsContext, ReactReduxContext);

    const test = useAppSelector((state) => {
        console.log(state, "state");
    });

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }, []);

    return isLoading ? (
        <Loader />
    ) : (
        <>
            <Canvas camera={{ fov: 25 }}>
                <ContextBridge>
                    <Scene />
                </ContextBridge>
            </Canvas>
            <Editor />
        </>
    );
};

export default App;
