import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ToiletModel, ToiletsArray, ToiletsChunkModel } from "../../toiletsTypes";

export interface ToiletsState {
    toiletsChunks: ToiletsChunkModel[];
}

const initialState: ToiletsState = {
    toiletsChunks: [],
};

export const toiletsSlice = createSlice({
    name: "toilets",
    initialState,
    reducers: {
        addToiletsChunk: (state, action: PayloadAction<ToiletsChunkModel[]>) => {
            state.toiletsChunks = action.payload;
        },
        removeAllToilets: (state) => {
            state.toiletsChunks = [];
        },
        removeToiletsChunk: (state, action: PayloadAction<string>) => {
            const id = action.payload;
            state.toiletsChunks = state.toiletsChunks.filter((x) => x.id !== id);
        },
        updateToilet: (state, action: PayloadAction<ToiletModel>) => {
            const toilet = action.payload;
            const toiletChunk = state.toiletsChunks.find((x) => x.id === toilet.toiletsChunkId);

            if (toiletChunk?.toilets) {
                toiletChunk.toilets = toiletChunk?.toilets.map((x) => {
                    if (x.id === toilet.id) {
                        return toilet;
                    }

                    return x;
                }) as ToiletsArray<ToiletModel>;
            }

            state.toiletsChunks = state.toiletsChunks.map((x) => {
                if (x.id === toiletChunk?.id) {
                    return toiletChunk;
                }

                return x;
            });
        },
    },
});

export const { addToiletsChunk, removeToiletsChunk, removeAllToilets, updateToilet } =
    toiletsSlice.actions;

export default toiletsSlice.reducer;
