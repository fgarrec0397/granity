import { FC } from "react";

import EditorPlayButton from "./EditorPlayButton";
import EditorPreviewButton from "./EditorPreviewButton";
import EditorPreviewUIButton from "./EditorPreviewUIButton";

const EditorControls: FC = () => {
    return (
        <>
            <EditorPreviewUIButton />
            <EditorPlayButton />
            <EditorPreviewButton />
        </>
    );
};

export default EditorControls;
