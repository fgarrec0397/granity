import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface GameControllerState {
    gameControllerMessage: string;
}

const initialState: GameControllerState = {
    gameControllerMessage: "",
};

export const gameControllerSlice = createSlice({
    name: "gameController",
    initialState,
    reducers: {
        addYourWidgetAction: (state, action: PayloadAction<string>) => {
            state.gameControllerMessage = action.payload;
        },
    },
});

export const { addYourWidgetAction } = gameControllerSlice.actions;

export default gameControllerSlice.reducer;
