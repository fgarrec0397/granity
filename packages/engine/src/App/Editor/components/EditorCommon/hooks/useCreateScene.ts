import { useScenes } from "@engine/api";
import { ChangeEvent, useState } from "react";

export default () => {
    const { addScene } = useScenes();
    const [sceneName, setSceneName] = useState<string>();
    const [isDefault, setIsDefault] = useState(false);

    const handleAddScene = () => {
        if (sceneName) {
            addScene(sceneName, isDefault);
        }
    };

    const handleChangeName = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        setSceneName(event.target.value);

    const handleIsDefault = (event: ChangeEvent<HTMLInputElement>): void => {
        setIsDefault(event.target.checked);
    };

    return {
        sceneName,
        handleChangeName,
        isDefault,
        handleIsDefault,
        handleAddScene,
    };
};
