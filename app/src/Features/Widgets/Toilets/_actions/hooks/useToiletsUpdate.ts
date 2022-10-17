import useGameUpdate from "@app/Game/_actions/hooks/useGameUpdate";

import useToilets from "./useToilets";

export default () => {
    const { toiletsChunks, addToiletChunk } = useToilets();

    useGameUpdate(() => {
        if (
            toiletsChunks.length &&
            toiletsChunks[toiletsChunks.length - 1].toilets.some((x) => x.isVisible)
        ) {
            addToiletChunk();
        }
    });
};
