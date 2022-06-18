import { FC } from "react";
import { Canvas } from "@react-three/fiber";
import { useContextBridge } from "@react-three/drei";
import { ReactReduxContext } from "react-redux";
import Editor from "@editor/Editor";
import Scene from "@scene/Scene";
import { SceneWidgetsContext } from "@widgets/providers/SceneWidgetsProvider";
import { WidgetsModulesContext } from "@widgets/providers/WidgetsModulesProvider";
// import { trigger } from "@core/utilities/events";
import { trigger } from "@core/utilities/events";
import { CamerasContext } from "@scene/providers/CamerasContextProvider";
import useInitWidgetsModules from "@widgets/hooks/useInitWidgetsModules";

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
