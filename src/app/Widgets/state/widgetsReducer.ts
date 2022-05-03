import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
    WidgetOptionsValues,
    WidgetProperties,
    WidgetsDictionary,
    WidgetsDictionaryItem,
} from "../types";

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
        addWidgetDictionary: (state, action: PayloadAction<Required<WidgetsDictionaryItem>>) => {
            const { id, properties, options } = action.payload;

            state.widgetsDictionary = {
                ...state.widgetsDictionary,
                [id]: { properties, options },
            };
        },
        updateWidgetDictionary: (state, action: PayloadAction<WidgetsDictionaryItem>) => {
            const { id, properties, options } = action.payload;

            if (properties) {
                state.widgetsDictionary[id].properties = properties;
            }

            if (options) {
                state.widgetsDictionary[id].options = options;
            }
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
