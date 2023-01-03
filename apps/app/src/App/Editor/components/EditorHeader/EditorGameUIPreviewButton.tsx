import Button from "@app/Common/components/Html/Button/Button";
import useEditor from "@app/Editor/_actions/hooks/useEditor";
import { FC } from "react";

const SaveButton: FC = () => {
    const { openEditorUIPreview } = useEditor();

    const onClickHandler = () => {
        openEditorUIPreview();
    };

    return <Button onClick={onClickHandler}>Game UI Preview</Button>;
};

export default SaveButton;
