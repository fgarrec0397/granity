import { FC } from "react";

import EditorHeader from "./EditorHeader/EditorHeader";
import EditorRightPanel from "./EditorRightPanel/EditorRightPanel";
import EditorWrapper from "./EditorWrapper";
import { EditorLeftPanel } from "./index";

const EditorUI: FC = () => {
    return (
        <EditorWrapper>
            <EditorHeader />
            <EditorLeftPanel />
            <EditorRightPanel />
        </EditorWrapper>
    );
};

export default EditorUI;
