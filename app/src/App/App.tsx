import { FC, ReactElement, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, useContextBridge, View } from "@react-three/drei";
import { ReactReduxContext } from "react-redux";
import Editor from "./Editor/Editor";
import Scene from "./Scene/Scene";
import { SceneWidgetsContext } from "./Widgets/providers/SceneWidgetsProvider";
import widgets from "../Features/collector";
import useWidgetsContext from "./Widgets/hooks/core/useWidgetsModuleContext";
import { WidgetsModulesContext } from "./Widgets/providers/WidgetsModulesProvider";
import { trigger } from "./Core/utils/events";

// const ViewAny = View as any;

const App: FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const mainView = useRef<HTMLDivElement>(null);
    const secondaryView = useRef<HTMLDivElement>(null);
    const { setWidgetsModules } = useWidgetsContext();
    const ContextBridge = useContextBridge(
        SceneWidgetsContext,
        WidgetsModulesContext,
        ReactReduxContext
    );

    // Store all kind of widgets in Widgets Context API
    useEffect(() => {
        setWidgetsModules(widgets);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onPointerMissed = (event: MouseEvent) => {
        event.stopPropagation();
        trigger("onPointerMissed:removeSelected");
    };

    return (
        <div style={{ position: "relative", width: "100%", height: "100%" }} ref={containerRef}>
            <div
                style={{ position: "absolute", top: "0px", width: "100%", height: "100%" }}
                ref={mainView}
            />
            <div
                style={{
                    position: "absolute",
                    bottom: "0px",
                    right: "0px",
                    width: "100px",
                    height: "100px",
                }}
                ref={secondaryView}
            />
            <Canvas
                camera={{ fov: 25 }}
                onCreated={(state) => state.events.connect?.(containerRef.current)}
                onPointerMissed={onPointerMissed}
            >
                {/* @ts-ignore */}
                <View index={1} track={mainView}>
                    {/* <PerspectiveCamera />
                        <OrbitControls /> */}
                    <ContextBridge>
                        <OrbitControls />
                        <Scene />
                    </ContextBridge>
                </View>
                {/* @ts-ignore */}
                <View index={2} track={secondaryView}>
                    <ContextBridge>
                        <OrbitControls />
                        <Scene />
                    </ContextBridge>
                </View>
            </Canvas>
            {/* <Editor /> */}
        </div>
    );
};

export default App;
