import { FC, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { useContextBridge } from "@react-three/drei";
import { ReactReduxContext } from "react-redux";
import Editor from "./Editor/Editor";
import Scene from "./Scene/Scene";
import { SceneWidgetsContext } from "./Widgets/providers/SceneWidgetsProvider";
import widgets from "../Features/collector";
import useWidgetsContext from "./Widgets/hooks/core/useWidgetsModuleContext";
import { WidgetsModulesContext } from "./Widgets/providers/WidgetsModulesProvider";
import { trigger } from "./Core/utils/events";
import { CamerasContext } from "./Scene/providers/CamerasContextProvider";
import useWidgetsModules from "./Widgets/hooks/useWidgetsModules";

const App: FC = () => {
    const { initWidgetsModules } = useWidgetsModules();
    const ContextBridge = useContextBridge(
        CamerasContext,
        SceneWidgetsContext,
        WidgetsModulesContext,
        ReactReduxContext
    );

    // Store all kind of widgets in Widgets Context API
    useEffect(() => {
        initWidgetsModules(widgets);
    }, [initWidgetsModules]);

    const onPointerMissed = (event: MouseEvent) => {
        event.stopPropagation();
        trigger("onPointerMissed:removeSelected");
    };

    return (
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
