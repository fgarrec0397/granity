import React, { FC } from "react";
import Editor from "./Editor";
import useIsEditor from "./state/hooks/useIsEditor";

const EditorController: FC = () => {
    const { isEditor } = useIsEditor();
    return <Editor isEditor={isEditor} />;
};

export default EditorController;
