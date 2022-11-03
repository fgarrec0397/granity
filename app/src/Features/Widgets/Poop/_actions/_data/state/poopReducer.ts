import createWidgetReducer from "@app/Widgets/_actions/utilities/createWidgetReducer";
import { PayloadAction } from "@reduxjs/toolkit";

export interface PoopState {
    score: number;
    isAlive: boolean;
}

const initialState: PoopState = {
    score: 0,
    isAlive: true,
};

export const poopSlice = createWidgetReducer({
    name: "poop",
    initialState,
    reducers: {
        setScore: (state, action: PayloadAction<number>) => {
            state.score = action.payload;
        },
        setIsAlive: (state, action: PayloadAction<boolean>) => {
            state.isAlive = action.payload;
        },
    },
});

export const { setScore, setIsAlive } = poopSlice.actions;

export default poopSlice;
