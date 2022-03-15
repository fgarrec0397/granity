import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TextState {
    text: string;
}

const initialState: TextState = {
    text: "Test 1, 2",
};

export const sceneSlice = createSlice({
    name: "textTest",
    initialState,
    reducers: {
        setText: (state, action: PayloadAction<string>) => {
            state.text = action.payload;
        },
    },
});

export const { setText } = sceneSlice.actions;

export default sceneSlice.reducer;
