import React, { FC } from "react";
import Editor from "./Editor";
import useEditorContext from "./state/hooks/useEditorContext";

const EditorController: FC = () => {
  const { isEditor } = useEditorContext();
  return <Editor isEditor={isEditor} />;
};

export default EditorController;
