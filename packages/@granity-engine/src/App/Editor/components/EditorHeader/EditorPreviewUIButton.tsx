import { IconButton, IconButtonProps } from "@granity/ui";
import useEditor from "@granity-engine/App/Editor/_actions/hooks/useEditor";
import { PreviewUI } from "@granity-engine/Theme/components/Icons";
import { FC } from "react";

export type EditorPreviewUIButtonPropsStyles = {
    button?: IconButtonProps;
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
        <IconButton onClick={onClickPreviewUIHandler} {...styles?.button}>
            <PreviewUI />
        </IconButton>
    );
};

export default EditorPreviewButton;
