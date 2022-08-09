import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { WidgetProperties, WidgetsDictionary, WidgetsDictionaryItem } from "../../widgetsTypes";

export interface WidgetsState {
    selected: string[];
    widgetsDictionary: WidgetsDictionary;
    currentWidgetProperties: WidgetProperties | null;
}

export const widgetsInitialState: WidgetsState = {
    selected: [],
    widgetsDictionary: {},
    currentWidgetProperties: null,
};

export const widgetsReducerActions = <T extends WidgetsState>() => ({
    addWidgetDictionary: (state: T, action: PayloadAction<Required<WidgetsDictionaryItem>>) => {
        const { id, properties, options } = action.payload;

        state.widgetsDictionary = {
            ...state.widgetsDictionary,
            [id]: { properties, options },
        };
    },
    addBatchWidgetDictionary: (state: T, action: PayloadAction<Required<WidgetsDictionary>>) => {
        const newWidgetsDictionary = action.payload;

        state.widgetsDictionary = {
            ...state.widgetsDictionary,
            ...newWidgetsDictionary,
        };
    },
    updateWidgetDictionary: (state: T, action: PayloadAction<WidgetsDictionaryItem>) => {
        const { id, properties, options } = action.payload;

        if (properties) {
            state.widgetsDictionary[id].properties = properties;
        }

        if (options) {
            state.widgetsDictionary[id].options = {
                ...state.widgetsDictionary[id].options,
                ...options,
            };
        }
    },
    removeWidgetDictionary: (state: T, action: PayloadAction<string>) => {
        const id = action.payload;
        delete state.widgetsDictionary[id];
    },
    setCurrentWidgetProperties: (state: WidgetsState, action: PayloadAction<WidgetProperties>) => {
        state.currentWidgetProperties = action.payload;
    },
    removeSelected: (state: WidgetsState) => {
        state.selected = [];
    },
    setSelected: (
        state: WidgetsState,
        action: PayloadAction<{ newSelectedId: string; isMultipleSelect?: boolean }>
    ) => {
        const newSelectedIdArray = action.payload.isMultipleSelect
            ? [...state.selected, action.payload.newSelectedId]
            : [action.payload.newSelectedId];
        state.selected = newSelectedIdArray;
    },
});

export const sceneSlice = createSlice({
    name: "editor",
    initialState: widgetsInitialState,
    reducers: widgetsReducerActions(),
});

export const {
    setSelected,
    addWidgetDictionary,
    addBatchWidgetDictionary,
    updateWidgetDictionary,
    removeWidgetDictionary,
    removeSelected,
    setCurrentWidgetProperties,
} = sceneSlice.actions;

export default sceneSlice.reducer;
