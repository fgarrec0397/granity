import Button from "@app/Common/components/Html/Button/Button";
import Play from "@app/Common/components/Html/Icons/Play";
import { FC } from "react";

const EditorPlayButton: FC = () => {
    // const { startGame } = useGame(); // TODO - work on aevent system to make this work ?

    const onClickPlayHandler = () => {
        console.log("Start game");

        // startGame();
    };

    return (
        <Button onClick={onClickPlayHandler} styleType="none">
            <Play />
        </Button>
    );
};

export default EditorPlayButton;
