import { Button } from "@granity/ui";
import useScenes from "@granity-engine/App/Scenes/_actions/hooks/useScenes";
import { FC } from "react";

const SaveButton: FC = () => {
    const { saveScene } = useScenes();

    const onSaveFileHanlder = () => {
        saveScene();
    };

    return <Button onClick={onSaveFileHanlder}>Save</Button>;
};

export default SaveButton;
