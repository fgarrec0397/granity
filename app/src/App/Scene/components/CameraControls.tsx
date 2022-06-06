import { FC } from "react";
import GameCamera from "./GameCamera";
import EditorCamera from "./EditorCamera";

const CameraControls: FC = () => {
    return (
        <>
            <EditorCamera />
            <GameCamera />
        </>
    );
};

export default CameraControls;
