import useGameInit from "@app/Game/_actions/hooks/useGameInit";

import useToilets from "./useToilets";

export default () => {
    const { addBatchToiletsChunk, removeAllToiletsChunks } = useToilets();

    const initFirstToiletBatch = () => {
        addBatchToiletsChunk();
    };

    useGameInit(
        () => {
            initFirstToiletBatch();
        },
        () => {
            removeAllToiletsChunks();
        }
    );
};
