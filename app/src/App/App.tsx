import { FC } from "react";
import { Canvas } from "@react-three/fiber";
import { useContextBridge } from "@react-three/drei";
import { ReactReduxContext } from "react-redux";
import Editor from "@editor/Editor";
import Scene from "@scene/Scene";
import { SceneWidgetsContext } from "@widgets/_actions/_data/providers/SceneWidgetsProvider";
import { WidgetsModulesContext } from "@widgets/_actions/_data/providers/WidgetsModulesProvider";
import { events } from "@core/utilities";
import { CamerasContext } from "@scene/providers/CamerasContextProvider";
import useInitWidgetsModules from "@widgets/_actions/hooks/useInitWidgetsModules";

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
        events.trigger("onPointerMissed:removeSelected"); // TODO -- refactor events system to avoid naming confusion
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
