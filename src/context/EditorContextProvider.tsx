import React, { FC, createContext } from "react";

export interface EditorContextModel {
  isEditor: boolean;
  hasEditorOpened?: boolean;
}

interface Props {
  value: EditorContextModel;
}

const defaultContext = {
  isEditor: false,
  hasEditorOpened: false,
};

export const EditorContext = createContext<EditorContextModel>(defaultContext);

const EditorContextProvider: FC<Props> = ({ value, children }) => {
  return (
    <EditorContext.Provider value={value}>{children}</EditorContext.Provider>
  );
};

export default EditorContextProvider;
