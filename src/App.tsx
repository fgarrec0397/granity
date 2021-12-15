import React, { FC, useContext, useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { notification } from "antd";
import GlobalStyle from "./theme/globalStyle";
import baseTheme from "./theme/baseTheme";
import Loader from "./Components/Loader";
import Canvas from "./Components/Elements/Canvas";
import EditorContextProvider, {
  EditorContext,
} from "./context/EditorContextProvider";

const App: FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isEditor, setIsEditor] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    const handleKeyUp = (event: KeyboardEvent): void => {
      if (event.code === "KeyE") {
        setIsEditor((prevIsEditor) => !prevIsEditor);
      }
    };
    document.addEventListener("keyup", handleKeyUp);
  }, []);

  useEffect(() => {
    if (isEditor) {
      document.exitPointerLock();
      notification.open({
        message: "Edit mode",
        description: "You entered in edit mode",
      });
    } else {
      notification.open({
        message: "Normal mode",
        description: "You entered in normal mode",
      });
    }
  }, [isEditor]);

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
