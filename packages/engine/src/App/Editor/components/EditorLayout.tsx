import { FC } from "react";

import EditorBottomPanel from "./EditorBottomPanel/EditorBottomPanel";
import EditorHeader from "./EditorHeader/EditorHeader";
import { CustomDragLayer } from "./EditorRightPanel/CustomDragLayer";
import EditorRightPanel from "./EditorRightPanel/EditorRightPanel";
import EditorWrapper from "./EditorWrapper";
import { EditorLeftPanel } from "./index";

const EditorUI: FC = () => {
    return (
        <EditorWrapper>
            <EditorHeader />
            <EditorLeftPanel />
            <EditorRightPanel />
            <EditorBottomPanel />
            <CustomDragLayer />
        </EditorWrapper>
    );
};

export default EditorUI;
