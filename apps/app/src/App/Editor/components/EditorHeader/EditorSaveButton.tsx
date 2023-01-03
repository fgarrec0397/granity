import Button from "@app/Common/components/Html/Button/Button";
import useScenes from "@app/Scenes/_actions/hooks/useScenes";
import { FC } from "react";

const SaveButton: FC = () => {
    const { saveScene } = useScenes();

    const onSaveFileHanlder = () => {
        saveScene();
    };

    return <Button onClick={onSaveFileHanlder}>Save</Button>;
};

export default SaveButton;
