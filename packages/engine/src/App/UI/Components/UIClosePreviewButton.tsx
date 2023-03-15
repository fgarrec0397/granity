import { Button } from "@granity/ui";
import useEditor from "@engine/App/Editor/_actions/hooks/useEditor";
import { FC } from "react";

const UIClosePreviewButton: FC = () => {
    const { closeEditorUIPreview } = useEditor();

    const onClickHandler = () => {
        closeEditorUIPreview();
    };

    return <Button onClick={onClickHandler}>Close UI Preview</Button>;
};

export default UIClosePreviewButton;
