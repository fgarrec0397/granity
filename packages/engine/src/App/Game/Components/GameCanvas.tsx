import canvasConfig from "@engine/App/Core/configs/canvas";
import { useContextBridge } from "@granity/three/src/drei";
import { Canvas } from "@granity/three/src/fiber";
import { useTheme } from "@granity/ui";
import { Context, FC } from "react";

import GameScene from "./GameScene";

type Props = {
    contexts: Context<any>[];
};

const GameCanvas: FC<Props> = ({ contexts }) => {
    const theme = useTheme();
    const ContextBridge = useContextBridge(...contexts);

    return (
        <Canvas
            style={{
                background: theme.palette.background.gradient,
            }}
            {...canvasConfig}
        >
            <ContextBridge>
                <GameScene />
            </ContextBridge>
        </Canvas>
    );
};

export default GameCanvas;
