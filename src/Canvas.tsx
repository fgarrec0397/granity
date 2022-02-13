import { Canvas } from "@react-three/fiber";
import React, { FC, useState } from "react";
import EditorController from "./Scene/_Editor/EditorController";
import EditorContextProvider, {
  EditorContextModel,
} from "./Scene/_Editor/state/EditorContextProvider";
import SceneController from "./Scene/SceneController";

interface Props {
  editorContextValue: EditorContextModel;
}

const CanvasComponent: FC<Props> = ({ editorContextValue }) => {
  const [currentContext, setCurrentContext] = useState<EditorContextModel>();
  const handleGetContext = (context: EditorContextModel): void => {
    setCurrentContext(context);
  };

  return (
    <>
      <Canvas camera={{ fov: 25 }}>
        <EditorContextProvider
          value={editorContextValue}
          getContext={handleGetContext}
        >
          <SceneController />
        </EditorContextProvider>
      </Canvas>
      <EditorContextProvider value={currentContext}>
        <EditorController />
      </EditorContextProvider>
    </>
  );
};

export default CanvasComponent;
