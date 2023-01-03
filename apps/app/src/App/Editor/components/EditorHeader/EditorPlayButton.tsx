import Button, { ButtonStylesProps } from "@app/Common/components/Html/Button/Button";
import Play from "@app/Common/components/Html/Icons/Play";
import useGame from "@app/Game/_actions/hooks/useGame";
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
            <Play />
        </Button>
    );
};

export default EditorPlayButton;
