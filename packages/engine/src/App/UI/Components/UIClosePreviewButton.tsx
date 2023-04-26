import useEditor from "@engine/App/Editor/_actions/hooks/useEditor";
import { Button } from "@granity/ui";
import { FC } from "react";

const UIClosePreviewButton: FC = () => {
    const { setEditorStatus } = useEditor();

    const onClickHandler = () => {
        setEditorStatus();
    };

    return <Button onClick={onClickHandler}>Close UI Preview</Button>;
};

export default UIClosePreviewButton;
