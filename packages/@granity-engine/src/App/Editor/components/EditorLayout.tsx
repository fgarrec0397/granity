import { FC } from "react";

import EditorHeader from "./EditorHeader/EditorHeader";
import { EditorLeftPanel } from "./index";

const EditorUI: FC = () => {
    return (
        <>
            <EditorHeader />
            <EditorLeftPanel />
            {/* <EditorRightPanel /> */}
        </>
    );
};

export default EditorUI;
