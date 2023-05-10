import canvasConfig from "@engine/App/Core/configs/canvas";
import useEditor from "@engine/App/Editor/_actions/hooks/useEditor";
import Scenes from "@engine/App/Scenes/Scenes";
import { useContextBridge } from "@granity/three/drei";
import { Canvas } from "@granity/three/fiber";
import { pxToRem, useTheme } from "@granity/ui";
import { Context, FC } from "react";

type Props = {
    contexts: Context<any>[];
};

const CoreCanvas: FC<Props> = ({ contexts }) => {
    const theme = useTheme();
    const { isPreview } = useEditor();
    const ContextBridge = useContextBridge(...contexts);
    const previewWarningBorderWidth = 4;

    return (
        <Canvas
            style={{
                background: theme.palette.background.gradient,
                ...(isPreview
                    ? {
                          padding: pxToRem(previewWarningBorderWidth),
                          height: `calc(100vh - ${pxToRem(previewWarningBorderWidth)})`,
                          boxShadow: `${theme.palette.warning.main} 0px 0px 0px ${pxToRem(
                              previewWarningBorderWidth
                          )} inset`,
                      }
                    : {}),
            }}
            {...canvasConfig}
        >
            <ContextBridge>
                <Scenes />
            </ContextBridge>
        </Canvas>
    );
};

export default CoreCanvas;
