import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { WidgetObjectInfo, WidgetObjectInfoDictionary } from "../../widgetsTypes";

export interface WidgetObjectInfoDictionaryState {
    widgetsObjectInfoDictionary: WidgetObjectInfoDictionary;
}

export const widgetsInitialState: WidgetObjectInfoDictionaryState = {
    widgetsObjectInfoDictionary: {},
};

export const widgetsSlice = createSlice({
    name: "widgets",
    initialState: widgetsInitialState,
    reducers: {
        addWidgetDictionary: (
            state: WidgetObjectInfoDictionaryState,
            action: PayloadAction<Required<WidgetObjectInfo>>
        ) => {
            const widgetObjectInfo = action.payload;

            state.widgetsObjectInfoDictionary = {
                ...state.widgetsObjectInfoDictionary,
                [widgetObjectInfo.id]: widgetObjectInfo,
            };
        },
        addBatchWidgetDictionary: (
            state: WidgetObjectInfoDictionaryState,
            action: PayloadAction<Required<WidgetObjectInfoDictionary>>
        ) => {
            const newWidgetsDictionary = action.payload;

            state.widgetsObjectInfoDictionary = {
                ...state.widgetsObjectInfoDictionary,
                ...newWidgetsDictionary,
            };
        },
        updateWidgetDictionaryV2: (
            state: WidgetObjectInfoDictionaryState,
            action: PayloadAction<{
                widgetId: string;
                value: Omit<WidgetObjectInfo, "id">;
            }>
        ) => {
            const { widgetId, value } = action.payload;

            state.widgetsObjectInfoDictionary[widgetId] = {
                ...state.widgetsObjectInfoDictionary[widgetId],
                ...value,
            };
        },
        updateWidgetDictionary: (
            state: WidgetObjectInfoDictionaryState,
            action: PayloadAction<WidgetObjectInfo>
        ) => {
            const { id, properties, options } = action.payload;

            if (properties) {
                state.widgetsObjectInfoDictionary[id].properties = properties;
            }

            if (options) {
                state.widgetsObjectInfoDictionary[id].options = {
                    ...state.widgetsObjectInfoDictionary[id].options,
                    ...options,
                };
            }
        },
        removeWidgetDictionary: (
            state: WidgetObjectInfoDictionaryState,
            action: PayloadAction<string>
        ) => {
            const id = action.payload;
            delete state.widgetsObjectInfoDictionary[id];
        },
        removeBatchWidgetDictionary: (
            state: WidgetObjectInfoDictionaryState,
            action: PayloadAction<string[]>
        ) => {
            const ids = action.payload;
            ids.forEach((x) => delete state.widgetsObjectInfoDictionary[x]);
        },
        overrideWidgetDictionary: (
            state: WidgetObjectInfoDictionaryState,
            action: PayloadAction<WidgetObjectInfoDictionary>
        ) => {
            state.widgetsObjectInfoDictionary = action.payload;
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
