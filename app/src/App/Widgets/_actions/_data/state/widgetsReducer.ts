import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
    WidgetProperties,
    WidgetsInfoDictionary,
    WidgetsInfoDictionaryItem,
} from "../../widgetsTypes";

export interface WidgetsState {
    widgetsInfoDictionary: WidgetsInfoDictionary;
    currentWidgetProperties: WidgetProperties | null;
}

export const widgetsInitialState: WidgetsState = {
    widgetsInfoDictionary: {},
    currentWidgetProperties: null,
};

export const widgetsReducerActions = <T extends WidgetsState>() => ({
    addWidgetDictionary: (state: T, action: PayloadAction<Required<WidgetsInfoDictionaryItem>>) => {
        const widgetsInfoDictionaryItem = action.payload;

        state.widgetsInfoDictionary = {
            ...state.widgetsInfoDictionary,
            [widgetsInfoDictionaryItem.id]: widgetsInfoDictionaryItem,
        };
    },
    addBatchWidgetDictionary: (
        state: T,
        action: PayloadAction<Required<WidgetsInfoDictionary>>
    ) => {
        const newWidgetsDictionary = action.payload;

        state.widgetsInfoDictionary = {
            ...state.widgetsInfoDictionary,
            ...newWidgetsDictionary,
        };
    },
    updateWidgetDictionaryV2: (
        state: T,
        action: PayloadAction<{ widgetId: string; value: Omit<WidgetsInfoDictionaryItem, "id"> }>
    ) => {
        const { widgetId, value } = action.payload;

        state.widgetsInfoDictionary[widgetId] = {
            ...state.widgetsInfoDictionary[widgetId],
            ...value,
        };

        // if (state.widgetsInfoDictionary[widgetId][]) {

        // }
    },
    updateWidgetDictionary: (state: T, action: PayloadAction<WidgetsInfoDictionaryItem>) => {
        const { id, properties, options } = action.payload;

        if (properties) {
            state.widgetsInfoDictionary[id].properties = properties;
        }

        if (options) {
            state.widgetsInfoDictionary[id].options = {
                ...state.widgetsInfoDictionary[id].options,
                ...options,
            };
        }
    },
    removeWidgetDictionary: (state: T, action: PayloadAction<string>) => {
        const id = action.payload;
        delete state.widgetsInfoDictionary[id];
    },
    removeBatchWidgetDictionary: (state: T, action: PayloadAction<string[]>) => {
        const ids = action.payload;
        ids.forEach((x) => delete state.widgetsInfoDictionary[x]);
    },
    overrideWidgetDictionary: (state: T, action: PayloadAction<WidgetsInfoDictionary>) => {
        state.widgetsInfoDictionary = action.payload;
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
    updateWidgetDictionaryV2,
    removeWidgetDictionary,
    removeBatchWidgetDictionary,
    overrideWidgetDictionary,
    setCurrentWidgetProperties,
} = widgetsSlice.actions;

export default widgetsSlice.reducer;
