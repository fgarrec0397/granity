import useGameInit from "@app/Game/_actions/hooks/useGameInit";
import { useCallback } from "react";

import useToilets from "./useToilets";

export default () => {
    const { addBatchToiletsChunk, removeAllToiletsChunks } = useToilets();

    const initFirstToiletBatch = useCallback(() => {
        addBatchToiletsChunk();
    }, [addBatchToiletsChunk]);

    useGameInit(
        () => {
            initFirstToiletBatch();
        },
        () => {
            removeAllToiletsChunks();
        }
    );
};
