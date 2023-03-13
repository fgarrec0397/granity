import canvasConfig from "@granity/engine/App/Core/configs/canvas";
import { useTheme } from "@granity/ui";
import { useContextBridge } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
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
