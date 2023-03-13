import useEditor from "@granity/engine/App/Editor/_actions/hooks/useEditor";
import { useCallback } from "react";

import useGameService from "../_data/hooks/useGameService";

export default () => {
    const { updateIsGamePaused } = useGameService();

    const { closeEditor } = useEditor();

    // This function is called when the game init
    const startGame = () => {
        closeEditor();
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
        startGame,
        pauseGame,
        playGame,
    };
};
