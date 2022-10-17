import useEditor from "@app/Editor/_actions/hooks/useEditor";
import { Button } from "antd";
import { FC } from "react";

const SaveButton: FC = () => {
    const { openEditorUIPreview } = useEditor();

    const onClickHandler = () => {
        openEditorUIPreview();
    };

    return <Button onClick={onClickHandler}>Game UI Preview</Button>;
};

export default SaveButton;
