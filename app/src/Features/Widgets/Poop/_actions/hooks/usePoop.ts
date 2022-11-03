import { useCallback, useEffect, useState } from "react";

import usePoopService from "../_data/hooks/usePoopService";

export default () => {
    const { isAlive, score, updateScore, updateIsAlive } = usePoopService();
    const [canAddPoint, setCanAddPoint] = useState(true); // Try to put this into a context api

    useEffect(() => {
        if (!canAddPoint) {
            setTimeout(() => {
                setCanAddPoint(true);
            }, 1000);
        }
    }, [canAddPoint]);

    const passToilet = useCallback(() => {
        if (canAddPoint) {
            updateScore((score || 0) + 1);
            setCanAddPoint(false);
        }
    }, [updateScore, canAddPoint, score]);

    const resetPoop = () => {
        revivePoop();
        updateScore(0);
    };

    const revivePoop = () => {
        updateIsAlive(true);
    };

    const killPoop = () => {
        updateIsAlive(false);
    };

    return { isAlive, score, passToilet, resetPoop, revivePoop, killPoop };
};
