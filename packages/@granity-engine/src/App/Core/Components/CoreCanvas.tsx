import canvasConfig from "@granity/engine/App/Core/configs/canvas";
import Scenes from "@granity/engine/App/Scenes/Scenes";
import { useTheme } from "@granity/ui";
import { useContextBridge } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
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
