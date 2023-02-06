import { IconButton, IconButtonProps } from "@granity/ui";
import useGame from "@granity-engine/App/Game/_actions/hooks/useGame";
import { Play } from "@granity-engine/Theme/components/Icons";
import { FC } from "react";

export type EditorPlayButtonStyles = {
    button?: IconButtonProps;
};

export type EditorPlayIconButtonProps = {
    styles?: EditorPlayButtonStyles;
};

const EditorPlayIconButton: FC<EditorPlayIconButtonProps> = ({ styles }) => {
    const { startGame } = useGame();

    const onClickPlayHandler = () => {
        startGame();
    };

    return (
        <IconButton onClick={onClickPlayHandler} {...styles?.button}>
            <Play />
        </IconButton>
    );
};

export default EditorPlayIconButton;
