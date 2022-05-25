import { FC, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { useContextBridge } from "@react-three/drei";
import { ReactReduxContext } from "react-redux";
import Editor from "./Editor/Editor";
import Scene from "./Scene/Scene";
import { SceneWidgetsContext } from "./Widgets/providers/SceneWidgetsProvider";
import widgets from "../Features/collector";
import useWidgetsContext from "./Widgets/state/hooks/core/useWidgetsModuleContext";
import { WidgetsModulesContext } from "./Widgets/providers/WidgetsModulesProvider";
import { trigger } from "./Core/utils/events";
// import { trigger } from "./Core/utils/events";

const App: FC = () => {
    const ContextBridge = useContextBridge(
        SceneWidgetsContext,
        WidgetsModulesContext,
        ReactReduxContext
    );
    const { setWidgetsModules } = useWidgetsContext();

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
