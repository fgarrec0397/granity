import React, { FC, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { useContextBridge } from "@react-three/drei";
import { ReactReduxContext, useDispatch } from "react-redux";
import Loader from "./Common/components/Loader";
import Editor from "./Editor/Editor";
import Scene from "./Scene/Scene";
import { WidgetsContext } from "./Widgets/WidgetsProvider";
import { removeSelected } from "./Widgets/state/widgetsReducer";

const App: FC = () => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const ContextBridge = useContextBridge(WidgetsContext, ReactReduxContext);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }, []);

    const onPointerMissed = (event: MouseEvent) => {
        event.stopPropagation();
        dispatch(removeSelected());
    };

    return isLoading ? (
        <Loader />
    ) : (
        <>
            <Canvas camera={{ fov: 25 }} onPointerMissed={onPointerMissed}>
                <ContextBridge>
                    <Scene />
                </ContextBridge>
            </Canvas>
            <Editor />
        </>
    );
};

export default App;
