import React, { FC, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { useContextBridge } from "@react-three/drei";
import { ReactReduxContext, useDispatch } from "react-redux";
import Loader from "./Common/components/Loader";
import Editor from "./Editor/Editor";
import Scene from "./Scene/Scene";
import { SceneWidgetsContext } from "./Widgets/providers/SceneWidgetsProvider";
import { removeSelected } from "./Widgets/state/widgetsReducer";
import widgets from "../Features/collector";
import useWidgetsContext from "./Widgets/state/hooks/core/useWidgetsContext";
import { WidgetsContext } from "./Widgets/providers/WidgetsProvider";

const App: FC = () => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const ContextBridge = useContextBridge(SceneWidgetsContext, WidgetsContext, ReactReduxContext);
    const { setWidgets } = useWidgetsContext();

    // Fake loading. Will be a real loading when save functionality will be implemented
    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }, []);

    // Store all kind of widgets in Widgets Context API
    useEffect(() => {
        console.log(widgets, "widgets in App");

        setWidgets(widgets);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onPointerMissed = (event: MouseEvent) => {
        event.stopPropagation();
        dispatch(removeSelected());
    };

    return isLoading ? (
        <Loader />
    ) : (
        <>
            <Canvas
                onCreated={(state) => console.log(state, "state")}
                camera={{ fov: 25 }}
                onPointerMissed={onPointerMissed}
            >
                <ContextBridge>
                    <Scene />
                </ContextBridge>
            </Canvas>
            <Editor />
        </>
    );
};

export default App;
