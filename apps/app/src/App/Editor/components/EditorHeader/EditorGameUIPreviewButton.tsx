import useEditor from "@app/Editor/_actions/hooks/useEditor";
import { FC } from "react";
import { Button } from "ui-granity";

const SaveButton: FC = () => {
    const { openEditorUIPreview } = useEditor();

    const onClickHandler = () => {
        openEditorUIPreview();
    };

    return <Button onClick={onClickHandler}>Game UI Preview</Button>;
};

export default SaveButton;
