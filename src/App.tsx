import React, { FC, useEffect, useState } from "react";
import Loader from "./common/components/Loader";
import Canvas from "./Canvas";
import EditorContextProvider from "./Scene/_Editor/state/EditorContextProvider";
import useHandleEditor from "./Scene/_Editor/state/hooks/useHandleEditor";

const App: FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const isEditor = useHandleEditor();

  return (
    <EditorContextProvider value={{ isEditor }}>
      {isLoading ? <Loader /> : <Canvas editorContextValue={{ isEditor }} />}
    </EditorContextProvider>
  );
};

export default App;
