import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type GameState = {
    isGamePaused: boolean;
};

const initialState: GameState = {
    isGamePaused: false,
};

export const gameSlice = createSlice({
    name: "game",
    initialState,
    reducers: {
        setIsGamePaused: (state: GameState, actions: PayloadAction<boolean>) => {
            state.isGamePaused = actions.payload;
        },
    },
});

export const { setIsGamePaused } = gameSlice.actions;

export default gameSlice.reducer;
