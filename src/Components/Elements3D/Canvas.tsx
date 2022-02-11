import { Canvas } from "@react-three/fiber";
import React, { FC, useState } from "react";
import EditorContextProvider, {
  EditorContextModel,
} from "../../context/EditorContextProvider";
import Editor from "../Editor/Editor";
import Scene from "./Scene";

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
          <Scene />
        </EditorContextProvider>
      </Canvas>
      <EditorContextProvider value={currentContext}>
        <Editor />
      </EditorContextProvider>
    </>
  );
};

export default CanvasComponent;
