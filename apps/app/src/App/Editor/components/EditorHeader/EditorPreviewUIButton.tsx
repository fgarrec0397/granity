import Button, { ButtonStylesProps } from "@app/Common/components/Html/Button/Button";
import PreviewUI from "@app/Common/components/Html/Icons/PreviewUI";
import useEditor from "@app/Editor/_actions/hooks/useEditor";
import { FC } from "react";

export type EditorPreviewUIButtonPropsStyles = {
    button?: ButtonStylesProps;
};

export type EditorPreviewUIButtonProps = {
    styles?: EditorPreviewUIButtonPropsStyles;
};
const EditorPreviewButton: FC<EditorPreviewUIButtonProps> = ({ styles }) => {
    const { openEditorUIPreview } = useEditor();

    const onClickPreviewUIHandler = () => {
        openEditorUIPreview();
    };

    return (
        <Button onClick={onClickPreviewUIHandler} styleType="none" {...styles?.button}>
            <PreviewUI />
        </Button>
    );
};

export default EditorPreviewButton;
