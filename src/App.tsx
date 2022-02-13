import React, { FC, useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { Provider } from "react-redux";
import GlobalStyle from "./theme/globalStyle";
import baseTheme from "./theme/baseTheme";
import Loader from "./common/components/Loader";
import Canvas from "./Canvas";
import { store } from "./store";
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
    <Provider store={store}>
      <ThemeProvider theme={baseTheme}>
        <EditorContextProvider value={{ isEditor }}>
          {isLoading ? (
            <Loader />
          ) : (
            <Canvas editorContextValue={{ isEditor }} />
          )}
        </EditorContextProvider>
        <GlobalStyle />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
