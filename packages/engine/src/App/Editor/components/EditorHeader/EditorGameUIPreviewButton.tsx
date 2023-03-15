import { Button } from "@granity/ui";
import useEditor from "@engine/App/Editor/_actions/hooks/useEditor";
import { FC } from "react";

const SaveButton: FC = () => {
    const { openEditorUIPreview } = useEditor();

    const onClickHandler = () => {
        openEditorUIPreview();
    };

    return <Button onClick={onClickHandler}>Game UI Preview</Button>;
};

export default SaveButton;
