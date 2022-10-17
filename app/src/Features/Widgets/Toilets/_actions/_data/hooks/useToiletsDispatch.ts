import { useAppDispatch } from "@app/Core/store";

import { ToiletModel, ToiletsChunkModel } from "../../toiletsTypes";
import {
    addToiletsChunk,
    removeAllToilets,
    removeToiletsChunk,
    updateToilet,
} from "../state/toiletsReducer";

export default () => {
    const dispatch = useAppDispatch();

    const dispatchAdd = (toiletChunks: ToiletsChunkModel[]) => {
        dispatch(addToiletsChunk(toiletChunks));
    };

    const dispatchRemoveAll = () => {
        dispatch(removeAllToilets());
    };

    const dispatchRemove = (toiletChunkId: string) => {
        dispatch(removeToiletsChunk(toiletChunkId));
    };

    const dispatchUpdate = (toilet: ToiletModel) => {
        dispatch(updateToilet(toilet));
    };

    return {
        dispatchAdd,
        dispatchRemove,
        dispatchUpdate,
        dispatchRemoveAll,
    };
};
