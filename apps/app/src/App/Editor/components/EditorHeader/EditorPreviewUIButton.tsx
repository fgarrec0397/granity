import useEditor from "@app/Editor/_actions/hooks/useEditor";
import { Button, ButtonStylesProps, Icons } from "@granity/ui";
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
            <Icons.PreviewUI />
        </Button>
    );
};

export default EditorPreviewButton;
