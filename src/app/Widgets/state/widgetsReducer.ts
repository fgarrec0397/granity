import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WidgetSceneObject } from "../types";

export interface WidgetsState {
    selected: string[];
    currentWidget: WidgetSceneObject | null;
}

const initialState: WidgetsState = {
    selected: [],
    currentWidget: null,
};

export const sceneSlice = createSlice({
    name: "editor",
    initialState,
    reducers: {
        setCurrentWidget: (state, action: PayloadAction<WidgetSceneObject>) => {
            state.currentWidget = action.payload;
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

export const { setSelected, removeSelected, setCurrentWidget } = sceneSlice.actions;

export default sceneSlice.reducer;
