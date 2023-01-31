import canvasConfig from "@granity-engine/App/Core/configs/canvas";
import { useContextBridge } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Context, FC } from "react";
import { useTheme } from "styled-components";

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
                background: theme.common.canvas.background,
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
