import { IconButton, IconButtonProps, pxToRem } from "@granity/ui";
import useGame from "@engine/App/Game/_actions/hooks/useGame";
import { Play } from "@engine/Theme/components/Icons";
import { FC } from "react";

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
    const { startGame } = useGame();

    const onClickPlayHandler = () => {
        startGame();
    };

    return (
        <IconButton onClick={onClickPlayHandler} {...styles.button}>
            <Play />
        </IconButton>
    );
};

export default EditorPlayIconButton;
