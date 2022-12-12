import { FC } from "react";

import EditorRightPanel from "./EditorRightPanel/EditorRightPanel";
import { EditorLeftPanel } from "./index";

const EditorUI: FC = () => {
    return (
        <>
            {/* Header here */}
            <EditorLeftPanel />
            <EditorRightPanel />
        </>
    );
};

export default EditorUI;
