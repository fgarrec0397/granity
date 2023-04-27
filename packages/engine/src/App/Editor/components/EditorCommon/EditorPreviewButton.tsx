import { Preview } from "@engine/Theme/components/Icons";
import { IconButton, IconButtonProps, pxToRem } from "@granity/ui";
import { FC } from "react";

import { useEditor } from "../../_actions/hooks";

export type EditorPreviewButtonStyles = {
    button?: IconButtonProps;
};

const styles: EditorPreviewButtonStyles = {
    button: {
        sx: {
            padding: pxToRem(4),
            color: "secondary.dark",
        },
    },
};

const EditorPreviewButton: FC = () => {
    const { setPreviewStatus, setEditorStatus, isEditor, isPreview } = useEditor();

    const onClickPreviewUIHandler = () => {
        if (isPreview) {
            return setEditorStatus();
        }

        setPreviewStatus();
    };

    return (
        <IconButton
            onClick={onClickPreviewUIHandler}
            {...styles.button}
            disabled={!isEditor && !isPreview}
        >
            <Preview />
        </IconButton>
    );
};

export default EditorPreviewButton;
