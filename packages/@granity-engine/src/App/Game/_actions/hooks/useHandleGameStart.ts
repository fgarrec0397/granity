import useEditor from "@granity/engine/App/Editor/_actions/hooks/useEditor";
import useCameras from "@granity/engine/App/Scenes/_actions/hooks/useCameras";
import { useEffect } from "react";

import getStartingCamera from "../utilities/getStartingCamera";

export default () => {
    const { isEditor } = useEditor();
    const { gameCameras, setCurrentCamera } = useCameras();

    useEffect(() => {
        const startingGameCamera = getStartingCamera(gameCameras);

        if (isEditor) {
            if (startingGameCamera?.id && startingGameCamera.cameraRef.current) {
                setCurrentCamera(startingGameCamera.id, startingGameCamera.position);
            }
        }
    }, [gameCameras, isEditor, setCurrentCamera]);
};
