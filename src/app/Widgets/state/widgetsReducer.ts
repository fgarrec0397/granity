import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SerializedWidgetSceneObject, WidgetProperties } from "../types";

export interface WidgetsState {
    selected: string[];
    selectedWidgets: SerializedWidgetSceneObject[];
    currentWidgetProperties: WidgetProperties | null;
}

const initialState: WidgetsState = {
    selected: [],
    selectedWidgets: [],
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
        removeSelectedWidgets: (state) => {
            state.selectedWidgets = [];
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
        setSelectedWidgets: (state, action: PayloadAction<SerializedWidgetSceneObject[]>) => {
            state.selectedWidgets = action.payload;
        },
    },
});

export const {
    setSelected,
    setSelectedWidgets,
    removeSelected,
    // removeSelectedWidgets,
    setCurrentWidgetProperties,
} = sceneSlice.actions;

export default sceneSlice.reducer;
