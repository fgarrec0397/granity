import useEditor from "@engine/App/Editor/_actions/hooks/useEditor";
import { useCallback } from "react";

import useGameService from "../_data/hooks/useGameService";

export default () => {
    const { updateIsGamePaused } = useGameService();

    const { setGamePreviewStatus } = useEditor();

    // This function is called when the game init
    const runGamePreview = () => {
        setGamePreviewStatus();
    };

    // Put the current game on pause
    const pauseGame = useCallback(() => {
        updateIsGamePaused(true);
    }, [updateIsGamePaused]);

    // Put the current game on play
    const playGame = useCallback(() => {
        updateIsGamePaused(false);
    }, [updateIsGamePaused]);

    return {
        runGamePreview,
        pauseGame,
        playGame,
    };
};
