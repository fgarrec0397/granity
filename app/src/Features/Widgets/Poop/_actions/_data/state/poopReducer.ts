import { createSlice } from "@reduxjs/toolkit";

export interface PoopState {
    score: number;
    isAlive: boolean;
}

const initialState: PoopState = {
    score: 0,
    isAlive: true,
};

export const poopSlice = createSlice({
    name: "poop",
    initialState,
    reducers: {
        addPoint: (state) => {
            state.score++;
        },
        killPoop: (state) => {
            state.isAlive = false;
        },
    },
});

export const { addPoint, killPoop } = poopSlice.actions;

export default poopSlice.reducer;
