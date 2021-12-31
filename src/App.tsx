import React, { FC, useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "./theme/globalStyle";
import baseTheme from "./theme/baseTheme";
import Loader from "./Components/Loader";
import Canvas from "./Components/Elements3D/Canvas";
import EditorContextProvider from "./context/EditorContextProvider";
import useHandleEditor from "./hooks/Editor/useHandleEditor";

const App: FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const isEditor = useHandleEditor();

  return (
    <ThemeProvider theme={baseTheme}>
      <EditorContextProvider value={{ isEditor }}>
        {isLoading ? <Loader /> : <Canvas editorContextValue={{ isEditor }} />}
      </EditorContextProvider>
      <GlobalStyle />
    </ThemeProvider>
  );
};

export default App;
