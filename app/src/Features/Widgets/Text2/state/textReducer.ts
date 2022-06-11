import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TextState2 {
    text: string;
}

const initialState: TextState2 = {
    text: "Test1",
};

export const sceneSlice = createSlice({
    name: "textTest2",
    initialState,
    reducers: {
        setText: (state, action: PayloadAction<string>) => {
            state.text = action.payload;
        },
    },
});

export const { setText } = sceneSlice.actions;

export default sceneSlice.reducer;
