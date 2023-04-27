import useEditor from "@engine/App/Editor/_actions/hooks/useEditor";
import { PreviewUI } from "@engine/Theme/components/Icons";
import { IconButton, IconButtonProps, pxToRem } from "@granity/ui";
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
    const { setUIPreviewStatus, isEditor, isUIPreview } = useEditor();

    const onClickPreviewUIHandler = () => {
        setUIPreviewStatus();
    };

    return (
        <IconButton
            onClick={onClickPreviewUIHandler}
            {...styles.button}
            disabled={!isEditor && !isUIPreview}
        >
            <PreviewUI />
        </IconButton>
    );
};

export default EditorPreviewUIButton;
