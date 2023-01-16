import useGame from "@app/Game/_actions/hooks/useGame";
import { Button, ButtonStylesProps, Icons } from "@granity/ui";
import { FC } from "react";

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
