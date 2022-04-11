import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Widget {
    id: string;
    name: string;
}

export interface WidgetsState {
    widgets: Widget[];
}

const initialState: WidgetsState = {
    widgets: [],
};

export const sceneSlice = createSlice({
    name: "widgets",
    initialState,
    reducers: {
        addWidget: (state, action: PayloadAction<Widget[]>) => {
            state.widgets = action.payload;
        },
    },
});

export const { addWidget } = sceneSlice.actions;

export default sceneSlice.reducer;
