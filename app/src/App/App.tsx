import { FC } from "react";
import { Canvas } from "@react-three/fiber";
import { useContextBridge } from "@react-three/drei";
import { ReactReduxContext } from "react-redux";
import Editor from "./Editor/Editor";
import Scene from "./Scene/Scene";
import { SceneWidgetsContext } from "./Widgets/providers/SceneWidgetsProvider";
import { WidgetsModulesContext } from "./Widgets/providers/WidgetsModulesProvider";
import { trigger } from "./Core/utilities/events";
import { CamerasContext } from "./Scene/providers/CamerasContextProvider";
import useInitWidgetsModules from "./Widgets/hooks/useInitWidgetsModules";

const App: FC = () => {
    const ContextBridge = useContextBridge(
        CamerasContext,
        SceneWidgetsContext,
        WidgetsModulesContext,
        ReactReduxContext
    );

    // Store all kind of widgets in Widgets Context API
    useInitWidgetsModules();

    const onPointerMissed = (event: MouseEvent) => {
        event.stopPropagation();
        trigger("onPointerMissed:removeSelected");
    };

    return (
        <>
            <Canvas camera={{ fov: 25, aspect: 1 }} onPointerMissed={onPointerMissed}>
                <ContextBridge>
                    <Scene />
                </ContextBridge>
            </Canvas>
            <Editor />
        </>
    );
};

export default App;
