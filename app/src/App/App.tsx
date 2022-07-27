import { events } from "@app/Core/_actions/utilities";
import useWidgetsInitModules from "@app/Widgets/_actions/hooks/useWidgetsInitModules";
import { useContextBridge } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { CamerasContext } from "@scene/_actions/_data/providers/CamerasContextProvider";
import Scene from "@scene/Scene";
import { SceneWidgetsContext } from "@widgets/_actions/_data/providers/SceneWidgetsProvider";
import { WidgetsModulesContext } from "@widgets/_actions/_data/providers/WidgetsModulesProvider";
import { FC } from "react";
import { ReactReduxContext } from "react-redux";

import UI from "./UI/UI";

const App: FC = () => {
    const ContextBridge = useContextBridge(
        CamerasContext,
        SceneWidgetsContext,
        WidgetsModulesContext,
        ReactReduxContext
    );

    // Store all kind of widgets in Widgets Context API
    useWidgetsInitModules();

    const onPointerMissed = (event: MouseEvent) => {
        event.stopPropagation();
        events.trigger("removeSelected"); // TODO -- refactor events system to avoid naming confusion
    };

    return (
        <>
            <Canvas camera={{ fov: 25, aspect: 1 }} onPointerMissed={onPointerMissed}>
                <ContextBridge>
                    <Scene />
                </ContextBridge>
            </Canvas>
            <UI />
        </>
    );
};

export default App;
