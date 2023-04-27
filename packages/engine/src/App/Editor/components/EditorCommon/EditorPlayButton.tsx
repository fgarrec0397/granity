import useGame from "@engine/App/Game/_actions/hooks/useGame";
import { Play } from "@engine/Theme/components/Icons";
import { IconButton, IconButtonProps, pxToRem } from "@granity/ui";
import { FC } from "react";

import { useEditor } from "../../_actions/hooks";

export type EditorPlayButtonStyles = {
    button?: IconButtonProps;
};

const styles: EditorPlayButtonStyles = {
    button: {
        sx: {
            padding: pxToRem(4),
            color: "secondary.dark",
        },
    },
};

const EditorPlayIconButton: FC = () => {
    const { isEditor, isGamePreview, setEditorStatus } = useEditor();
    const { runGamePreview } = useGame();

    const onClickPlayHandler = () => {
        if (isGamePreview) {
            return setEditorStatus();
        }

        runGamePreview();
    };

    return (
        <IconButton
            onClick={onClickPlayHandler}
            {...styles.button}
            disabled={!isEditor && !isGamePreview}
        >
            <Play />
        </IconButton>
    );
};

export default EditorPlayIconButton;
