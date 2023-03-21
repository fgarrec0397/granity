import canvasConfig from "@engine/App/Core/configs/canvas";
import Scenes from "@engine/App/Scenes/Scenes";
import { useContextBridge } from "@granity/three/drei";
import { Canvas } from "@granity/three/fiber";
import { useTheme } from "@granity/ui";
import { Context, FC } from "react";

import useCore from "../_actions/hooks/useCore";

type Props = {
    contexts: Context<any>[];
};

const CoreCanvas: FC<Props> = ({ contexts }) => {
    const theme = useTheme();
    const { onCorePointerMissed } = useCore();
    const ContextBridge = useContextBridge(...contexts);

    const onPointerMissed = (event: MouseEvent) => {
        if ((event.target as Element)?.tagName === "CANVAS") {
            onCorePointerMissed(event);
        }
    };

    return (
        <Canvas
            style={{
                background: theme.palette.background.gradient,
            }}
            {...canvasConfig}
            onPointerMissed={onPointerMissed}
        >
            <ContextBridge>
                <Scenes />
            </ContextBridge>
        </Canvas>
    );
};

export default CoreCanvas;
