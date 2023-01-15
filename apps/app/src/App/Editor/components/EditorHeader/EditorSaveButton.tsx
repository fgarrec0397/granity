import useScenes from "@app/Scenes/_actions/hooks/useScenes";
import { FC } from "react";
import { Button } from "ui-granity";

const SaveButton: FC = () => {
    const { saveScene } = useScenes();

    const onSaveFileHanlder = () => {
        saveScene();
    };

    return <Button onClick={onSaveFileHanlder}>Save</Button>;
};

export default SaveButton;
