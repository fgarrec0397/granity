import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WidgetProperties, WidgetsDictionary } from "../types";

export interface WidgetsState {
    selected: string[];
    widgetsDictionary: WidgetsDictionary;
    currentWidgetProperties: WidgetProperties | null;
}

const initialState: WidgetsState = {
    selected: [],
    widgetsDictionary: {},
    currentWidgetProperties: null,
};

export const sceneSlice = createSlice({
    name: "editor",
    initialState,
    reducers: {
        setCurrentWidgetProperties: (state, action: PayloadAction<WidgetProperties>) => {
            state.currentWidgetProperties = action.payload;
        },
        addWidgetDictionary: (
            state,
            action: PayloadAction<{
                id: string;
                properties: WidgetProperties;
            }>
        ) => {
            const { id, properties } = action.payload;

            state.widgetsDictionary = {
                ...state.widgetsDictionary,
                [id]: { properties },
            };
        },
        updateWidgetDictionary: (
            state,
            action: PayloadAction<{
                id: string;
                properties: WidgetProperties;
            }>
        ) => {
            const { id, properties } = action.payload;

            state.widgetsDictionary[id] = { properties };
        },
        removeWidgetDictionary: (state, action: PayloadAction<string>) => {
            const id = action.payload;
            delete state.widgetsDictionary[id];
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

export const {
    setSelected,
    addWidgetDictionary,
    updateWidgetDictionary,
    removeWidgetDictionary,
    removeSelected,
    setCurrentWidgetProperties,
} = sceneSlice.actions;

export default sceneSlice.reducer;
