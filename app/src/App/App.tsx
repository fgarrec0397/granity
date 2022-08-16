import { WidgetsContext } from "@app/Widgets/_actions/_data/providers/WidgetsProvider";
import useWidgetsInitModules from "@app/Widgets/_actions/hooks/useWidgetsInitModules";
import { useContextBridge } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { CamerasContext } from "@scene/_actions/_data/providers/CamerasContextProvider";
import Scene from "@scene/Scene";
import { WidgetsModulesContext } from "@widgets/_actions/_data/providers/WidgetsModulesProvider";
import { FC } from "react";
import { ReactReduxContext } from "react-redux";

import { GameWidgetsContext } from "./Game/_actions/_data/providers/GameWidgetsProvider";
import UI from "./UI/UI";
import { useWidgets } from "./Widgets/_actions/hooks";

const App: FC = () => {
    const { removeSelected } = useWidgets();
    const ContextBridge = useContextBridge(
        CamerasContext,
        WidgetsContext,
        GameWidgetsContext,
        WidgetsModulesContext,
        ReactReduxContext
    );

    // Store all kind of widgets in Widgets Context API
    useWidgetsInitModules();

    const onPointerMissed = (event: MouseEvent) => {
        event.stopPropagation();
        removeSelected();
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
