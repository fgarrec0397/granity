import useEditor from "@granity/engine/App/Editor/_actions/hooks/useEditor";
import { Button } from "@granity/ui";
import { FC } from "react";

const UIClosePreviewButton: FC = () => {
    const { closeEditorUIPreview } = useEditor();

    const onClickHandler = () => {
        closeEditorUIPreview();
    };

    return <Button onClick={onClickHandler}>Close UI Preview</Button>;
};

export default UIClosePreviewButton;
