import useGame from "@app/Game/_actions/hooks/useGame";
import { FC } from "react";
import { Button, ButtonStylesProps, Icons } from "ui-granity";

export type EditorPlayButtonPropsStyles = {
    button?: ButtonStylesProps;
};

export type EditorPlayButtonProps = {
    styles?: EditorPlayButtonPropsStyles;
};

const EditorPlayButton: FC<EditorPlayButtonProps> = ({ styles }) => {
    const { startGame } = useGame();

    const onClickPlayHandler = () => {
        startGame();
    };

    return (
        <Button onClick={onClickPlayHandler} styleType="none" {...styles?.button}>
            <Icons.Play />
        </Button>
    );
};

export default EditorPlayButton;
