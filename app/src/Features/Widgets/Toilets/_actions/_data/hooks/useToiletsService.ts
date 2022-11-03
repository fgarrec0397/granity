import clone from "lodash/clone";
import { useCallback } from "react";

import { ToiletModel, ToiletsChunkModel } from "../../toiletsTypes";
import useToiletsDispatch from "./useToiletsDispatch";
import useToiletsSelector from "./useToiletsSelector";

type ValuesType<T> = {
    [K in keyof T]: T[K];
};

export default () => {
    const toilets = useToiletsSelector();
    const { dispatchUpdate, dispatchAdd, dispatchRemove, dispatchRemoveAll } = useToiletsDispatch();

    const getToiletChunkByID = useCallback(
        (id: string) => {
            return toilets?.toiletsChunks.find((x) => x.id === id);
        },
        [toilets?.toiletsChunks]
    );

    const getToiletById = useCallback(
        (toiletId: string, toiletsChunkId: string) => {
            return getToiletChunkByID(toiletsChunkId)?.toilets.find((x) => x.id === toiletId);
        },
        [getToiletChunkByID]
    );

    const add = useCallback(
        (toiletsChunk: ToiletsChunkModel) => {
            const newToiletsChunks = [...(toilets?.toiletsChunks || []), toiletsChunk];
            dispatchAdd(newToiletsChunks);
        },
        [dispatchAdd, toilets?.toiletsChunks]
    );

    const addBatch = useCallback(
        (toiletsChunksArray: ToiletsChunkModel[]) => {
            const newToiletsChunks = [...(toilets?.toiletsChunks || []), ...toiletsChunksArray];
            dispatchAdd(newToiletsChunks);
        },
        [dispatchAdd, toilets?.toiletsChunks]
    );

    const removeAll = useCallback(() => {
        dispatchRemoveAll();
    }, [dispatchRemoveAll]);

    const remove = useCallback(
        (toiletChunkId: string) => {
            dispatchRemove(toiletChunkId);
        },
        [dispatchRemove]
    );

    const update = useCallback(
        <T>(toilet: ToiletModel, values: ValuesType<T>) => {
            const newToilet = clone(toilet);

            Object.keys(values).forEach((x) => {
                (newToilet as any)[x] = values[x as keyof ValuesType<T>];
            });

            dispatchUpdate(newToilet);
        },
        [dispatchUpdate]
    );

    return {
        toiletsChunks: toilets?.toiletsChunks || [],
        add,
        addBatch,
        removeAll,
        remove,
        update,
        getToiletChunkByID,
        getToiletById,
    };
};
