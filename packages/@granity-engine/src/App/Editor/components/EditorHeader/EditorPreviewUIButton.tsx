import { IconButton, IconButtonProps, pxToRem } from "@granity/ui";
import useEditor from "@granity-engine/App/Editor/_actions/hooks/useEditor";
import { PreviewUI } from "@granity-engine/Theme/components/Icons";
import { FC } from "react";

export type EditorPreviewUIButtonStyles = {
    button?: IconButtonProps;
};

const styles: EditorPreviewUIButtonStyles = {
    button: {
        sx: {
            padding: pxToRem(4),
            color: "secondary.dark",
        },
    },
};

const EditorPreviewUIButton: FC = () => {
    const { openEditorUIPreview } = useEditor();

    const onClickPreviewUIHandler = () => {
        openEditorUIPreview();
    };

    return (
        <IconButton onClick={onClickPreviewUIHandler} {...styles.button}>
            <PreviewUI />
        </IconButton>
    );
};

export default EditorPreviewUIButton;
