import useEditor from "@app/Editor/_actions/hooks/useEditor";
import useCameras from "@app/Scenes/_actions/hooks/useCameras";
import { useCallback } from "react";

import useGameService from "../_data/hooks/useGameService";
import getStartingCamera from "../utilities/getStartingCamera";

export default () => {
    const { updateIsGamePaused } = useGameService();

    const { closeEditor } = useEditor();
    const { gameCameras, setCurrentCamera } = useCameras();

    // This function is called when the game init
    const startGame = () => {
        const startingGameCamera = getStartingCamera(gameCameras);

        closeEditor();

        if (startingGameCamera?.id && startingGameCamera.cameraRef.current) {
            setCurrentCamera(startingGameCamera.id, startingGameCamera.position);
        }
    };

    const pauseGame = useCallback(() => {
        updateIsGamePaused(true);
    }, [updateIsGamePaused]);

    const playGame = useCallback(() => {
        updateIsGamePaused(false);
    }, [updateIsGamePaused]);

    return {
        startGame,
        pauseGame,
        playGame,
    };
};
