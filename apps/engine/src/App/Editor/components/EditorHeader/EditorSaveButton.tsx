import useScenes from "@app/Scenes/_actions/hooks/useScenes";
import { Button } from "@granity/ui";
import { FC } from "react";

const SaveButton: FC = () => {
    const { saveScene } = useScenes();

    const onSaveFileHanlder = () => {
        saveScene();
    };

    return <Button onClick={onSaveFileHanlder}>Save</Button>;
};

export default SaveButton;
