import clone from "lodash/clone";
import { useCallback } from "react";

import { ToiletModel, ToiletsChunkModel } from "../../toiletsTypes";
import useToiletsDispatch from "./useToiletsDispatch";
import useToiletsSelector from "./useToiletsSelector";

type ValuesType<T> = {
    [K in keyof T]: T[K];
};

export default () => {
    const { toiletsChunks } = useToiletsSelector();
    const { dispatchUpdate, dispatchAdd, dispatchRemove, dispatchRemoveAll } = useToiletsDispatch();

    const getToiletChunkByID = useCallback(
        (id: string) => {
            return toiletsChunks.find((x) => x.id === id);
        },
        [toiletsChunks]
    );

    const getToiletById = useCallback(
        (toiletId: string, toiletsChunkId: string) => {
            return getToiletChunkByID(toiletsChunkId)?.toilets.find((x) => x.id === toiletId);
        },
        [getToiletChunkByID]
    );

    const add = useCallback(
        (toiletsChunk: ToiletsChunkModel) => {
            const newToiletsChunks = [...toiletsChunks, toiletsChunk];
            dispatchAdd(newToiletsChunks);
        },
        [dispatchAdd, toiletsChunks]
    );

    const addBatch = useCallback(
        (toiletsChunksArray: ToiletsChunkModel[]) => {
            const newToiletsChunks = [...toiletsChunks, ...toiletsChunksArray];
            dispatchAdd(newToiletsChunks);
        },
        [dispatchAdd, toiletsChunks]
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
        toiletsChunks,
        add,
        addBatch,
        removeAll,
        remove,
        update,
        getToiletChunkByID,
        getToiletById,
    };
};
