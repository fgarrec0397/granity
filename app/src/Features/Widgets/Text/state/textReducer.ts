import createWidgetReducer from "@app/Widgets/_actions/utilities/createWidgetReducer";
import { PayloadAction } from "@reduxjs/toolkit";

export interface TextState {
    text: string;
}

const initialState: TextState = {
    text: "Test 1, 2",
};

export const sceneSlice = createWidgetReducer({
    name: "textTest",
    initialState,
    reducers: {
        setText: (state, action: PayloadAction<string>) => {
            state.text = action.payload;
        },
    },
});

export const { setText } = sceneSlice.actions;

export default sceneSlice;
