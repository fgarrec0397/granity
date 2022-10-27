import Scenes from "@app/Scenes/Scenes";
import { useContextBridge } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Context, FC } from "react";

import useCore from "../_actions/hooks/useCore";
import canvasConfig from "../configs/canvas";

type Props = {
    contexts: Context<any>[];
};

const CoreCanvas: FC<Props> = ({ contexts }) => {
    const { onCorePointerMissed } = useCore();
    const ContextBridge = useContextBridge(...contexts);

    const onPointerMissed = (event: MouseEvent) => {
        onCorePointerMissed(event);
    };

    return (
        <Canvas {...canvasConfig} onPointerMissed={onPointerMissed}>
            <ContextBridge>
                <Scenes />
            </ContextBridge>
        </Canvas>
    );
};

export default CoreCanvas;
