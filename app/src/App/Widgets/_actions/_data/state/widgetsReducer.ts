import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { WidgetProperties, WidgetsDictionary, WidgetsDictionaryItem } from "../../widgetsTypes";

export interface WidgetsState {
    widgetsDictionary: WidgetsDictionary;
    currentWidgetProperties: WidgetProperties | null;
}

export const widgetsInitialState: WidgetsState = {
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
    removeBatchWidgetDictionary: (state: T, action: PayloadAction<string[]>) => {
        const ids = action.payload;
        ids.forEach((x) => delete state.widgetsDictionary[x]);
    },
    overrideWidgetDictionary: (state: T, action: PayloadAction<WidgetsDictionary>) => {
        state.widgetsDictionary = action.payload;
    },
    setCurrentWidgetProperties: (state: WidgetsState, action: PayloadAction<WidgetProperties>) => {
        state.currentWidgetProperties = action.payload;
    },
});

export const widgetsSlice = createSlice({
    name: "widgets",
    initialState: widgetsInitialState,
    reducers: widgetsReducerActions(),
});

export const {
    addWidgetDictionary,
    addBatchWidgetDictionary,
    updateWidgetDictionary,
    removeWidgetDictionary,
    removeBatchWidgetDictionary,
    overrideWidgetDictionary,
    setCurrentWidgetProperties,
} = widgetsSlice.actions;

export default widgetsSlice.reducer;
