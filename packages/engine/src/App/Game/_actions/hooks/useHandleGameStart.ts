import useEditor from "@engine/App/Editor/_actions/hooks/useEditor";
import useCameras from "@engine/App/Scenes/_actions/hooks/useCameras";
import { useEffect } from "react";

import getStartingCamera from "../utilities/getStartingCamera";

export default () => {
    const { isGame, isGamePreview } = useEditor();
    const { gameCameras, setCurrentCamera } = useCameras();

    useEffect(() => {
        const startingGameCamera = getStartingCamera(gameCameras);

        if (isGame || isGamePreview) {
            if (startingGameCamera?.id && startingGameCamera.cameraRef.current) {
                setCurrentCamera(startingGameCamera.id, startingGameCamera.position);
            }
        }
    }, [gameCameras, isGame, isGamePreview, setCurrentCamera]);
};
