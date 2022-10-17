import { Vector3Array } from "@app/Common/commonTypes";
import getRandomNumber from "@app/Common/utilities/getRandomNumber";
import { useCallback } from "react";
import { Vector3 } from "three";

import useToiletsService from "../_data/hooks/useToiletsService";
import { ToiletModel, ToiletsChunkModel, ToiletsChunkToilets } from "../toiletsTypes";
import createToiletsChunk from "../utilities/createToiletsChunk";

enum AddToiletsChunkMode {
    Add = "Add",
    Get = "Get",
}

type AddToiletsChunkParameter = {
    mode: AddToiletsChunkMode;
    toiletsChunks?: ToiletsChunkModel[];
};

export default () => {
    const { toiletsChunks, update, getToiletById, add, addBatch, remove, removeAll } =
        useToiletsService();

    const addToiletChunk = useCallback(
        (parameter?: AddToiletsChunkParameter) => {
            const toiletWidth = 4.5;
            const spacingWidth = 16;
            const newToiletChunk = createToiletsChunk();
            const currentToiletsChunks = parameter?.toiletsChunks || toiletsChunks;
            const lastToiletChunk = currentToiletsChunks[currentToiletsChunks.length - 1];
            const lastToiletPosition = lastToiletChunk
                ? lastToiletChunk.toilets[lastToiletChunk.toilets.length - 1].position
                : [0, 0, 0];

            newToiletChunk.toilets = newToiletChunk.toilets.map((x, index) => {
                return {
                    ...x,
                    position: [
                        toiletWidth +
                            lastToiletPosition[0] +
                            (spacingWidth - toiletWidth) +
                            index * spacingWidth,
                        getRandomNumber(-3, 7),
                        0,
                    ],
                };
            }) as ToiletsChunkToilets;

            switch (parameter?.mode) {
                case AddToiletsChunkMode.Add:
                    add(newToiletChunk);
                    break;
                case AddToiletsChunkMode.Get:
                    return newToiletChunk;

                default:
                    add(newToiletChunk);
                    break;
            }
        },
        [add, toiletsChunks]
    );

    const addBatchToiletsChunk = useCallback(() => {
        const newToiletsChunks: ToiletsChunkModel[] = [];

        for (let index = 0; index < 1; index++) {
            if (toiletsChunks.length <= 1) {
                newToiletsChunks.push(
                    addToiletChunk({
                        mode: AddToiletsChunkMode.Get,
                        toiletsChunks: newToiletsChunks,
                    }) as ToiletsChunkModel
                );
            }
        }

        addBatch(newToiletsChunks);
    }, [addBatch, addToiletChunk, toiletsChunks]);

    const removeAllToiletsChunks = useCallback(() => {
        removeAll();
    }, [removeAll]);

    const removeToiletChunk = useCallback(
        (toiletChunkId: string) => {
            remove(toiletChunkId);
        },
        [remove]
    );

    const setIsVisible = useCallback(
        (toiletId: string, toiletsChunkId: string, isVisible: boolean) => {
            const toilet = getToiletById(toiletId, toiletsChunkId);

            if (toilet) {
                update(toilet, {
                    isVisible,
                });
            }
        },
        [getToiletById, update]
    );

    const setToiletPosition = useCallback(
        (toilet: ToiletModel, position: Vector3 | Vector3Array) => {
            update(toilet, {
                position,
            });
        },
        [update]
    );

    return {
        toiletsChunks,
        setIsVisible,
        setToiletPosition,
        addToiletChunk,
        addBatchToiletsChunk,
        removeToiletChunk,
        removeAllToiletsChunks,
    };
};
