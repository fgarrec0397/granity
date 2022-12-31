import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { WidgetsInfoDictionary, WidgetsInfoDictionaryItem } from "../../widgetsTypes";

export interface WidgetsInfoDictionaryState {
    widgetsInfoDictionary: WidgetsInfoDictionary;
}

export const widgetsInitialState: WidgetsInfoDictionaryState = {
    widgetsInfoDictionary: {},
};

export const widgetsSlice = createSlice({
    name: "widgets",
    initialState: widgetsInitialState,
    reducers: {
        addWidgetDictionary: (
            state: WidgetsInfoDictionaryState,
            action: PayloadAction<Required<WidgetsInfoDictionaryItem>>
        ) => {
            const widgetsInfoDictionaryItem = action.payload;

            state.widgetsInfoDictionary = {
                ...state.widgetsInfoDictionary,
                [widgetsInfoDictionaryItem.id]: widgetsInfoDictionaryItem,
            };
        },
        addBatchWidgetDictionary: (
            state: WidgetsInfoDictionaryState,
            action: PayloadAction<Required<WidgetsInfoDictionary>>
        ) => {
            const newWidgetsDictionary = action.payload;

            state.widgetsInfoDictionary = {
                ...state.widgetsInfoDictionary,
                ...newWidgetsDictionary,
            };
        },
        updateWidgetDictionaryV2: (
            state: WidgetsInfoDictionaryState,
            action: PayloadAction<{
                widgetId: string;
                value: Omit<WidgetsInfoDictionaryItem, "id">;
            }>
        ) => {
            const { widgetId, value } = action.payload;

            state.widgetsInfoDictionary[widgetId] = {
                ...state.widgetsInfoDictionary[widgetId],
                ...value,
            };
        },
        updateWidgetDictionary: (
            state: WidgetsInfoDictionaryState,
            action: PayloadAction<WidgetsInfoDictionaryItem>
        ) => {
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
        removeWidgetDictionary: (
            state: WidgetsInfoDictionaryState,
            action: PayloadAction<string>
        ) => {
            const id = action.payload;
            delete state.widgetsInfoDictionary[id];
        },
        removeBatchWidgetDictionary: (
            state: WidgetsInfoDictionaryState,
            action: PayloadAction<string[]>
        ) => {
            const ids = action.payload;
            ids.forEach((x) => delete state.widgetsInfoDictionary[x]);
        },
        overrideWidgetDictionary: (
            state: WidgetsInfoDictionaryState,
            action: PayloadAction<WidgetsInfoDictionary>
        ) => {
            state.widgetsInfoDictionary = action.payload;
        },
    },
});

export const {
    addWidgetDictionary,
    addBatchWidgetDictionary,
    updateWidgetDictionary,
    updateWidgetDictionaryV2,
    removeWidgetDictionary,
    removeBatchWidgetDictionary,
    overrideWidgetDictionary,
} = widgetsSlice.actions;

export default widgetsSlice.reducer;
