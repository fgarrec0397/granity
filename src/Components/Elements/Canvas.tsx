import { Canvas } from "@react-three/fiber";
import React, { FC } from "react";
import EditorContextProvider, {
  EditorContextModel,
} from "../../context/EditorContextProvider";
import Scene from "./Scene";

interface Props {
  editorContextValue: EditorContextModel;
}

const CanvasComponent: FC<Props> = ({ editorContextValue }) => {
  return (
    <Canvas
      camera={{ fov: 45 }}
      raycaster={{
        computeOffsets: (e: any) => ({
          offsetX: e.target.width / 2,
          offsetY: e.target.height / 2,
        }),
      }}
    >
      <EditorContextProvider value={editorContextValue}>
        <Scene />
      </EditorContextProvider>
    </Canvas>
  );
};

export default CanvasComponent;
