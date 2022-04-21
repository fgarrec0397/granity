import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WidgetProperties } from "../types";

export interface WidgetsState {
    selected: string[];
    currentWidgetProperties: WidgetProperties | null;
}

const initialState: WidgetsState = {
    selected: [],
    currentWidgetProperties: null,
};

export const sceneSlice = createSlice({
    name: "editor",
    initialState,
    reducers: {
        setCurrentWidgetProperties: (state, action: PayloadAction<WidgetProperties>) => {
            state.currentWidgetProperties = action.payload;
        },
        removeSelected: (state) => {
            state.selected = [];
        },
        setSelected: (
            state,
            action: PayloadAction<{ newSelectedId: string; isMultipleSelect?: boolean }>
        ) => {
            const newSelectedIdArray = action.payload.isMultipleSelect
                ? [...state.selected, action.payload.newSelectedId]
                : [action.payload.newSelectedId];
            state.selected = newSelectedIdArray;
        },
    },
});

export const { setSelected, removeSelected, setCurrentWidgetProperties } = sceneSlice.actions;

export default sceneSlice.reducer;
