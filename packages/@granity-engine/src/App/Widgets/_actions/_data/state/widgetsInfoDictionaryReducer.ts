import { clone, pull } from "@granity/helpers";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { WidgetObjectInfo, WidgetObjectInfoDictionary } from "../../widgetsTypes";
import { UpdateWidgetParameter } from "../widgetsServiceParameters";

export interface WidgetObjectInfoDictionaryState {
    byId: WidgetObjectInfoDictionary;
    allIds: string[];
}

export const widgetsInitialState: WidgetObjectInfoDictionaryState = {
    byId: {},
    allIds: [],
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

            state.byId = {
                ...state.byId,
                [widgetObjectInfo.id]: widgetObjectInfo,
            };

            state.allIds.push(widgetObjectInfo.id);
        },
        addBatchWidgetDictionary: (
            state: WidgetObjectInfoDictionaryState,
            action: PayloadAction<Required<WidgetObjectInfoDictionary>>
        ) => {
            const newWidgetsDictionary = action.payload;

            state.byId = {
                ...state.byId,
                ...newWidgetsDictionary,
            };

            state.allIds = [...state.allIds, ...Object.keys(newWidgetsDictionary)];
        },
        updateWidgetDictionary: (
            state: WidgetObjectInfoDictionaryState,
            action: PayloadAction<{
                widgetId: string;
                value: UpdateWidgetParameter;
            }>
        ) => {
            const { widgetId, value } = action.payload;

            if (value.displayName) {
                state.byId[widgetId].displayName = value.displayName;
            }

            if (value.properties) {
                state.byId[widgetId].properties = value.properties;
            }

            if (value.options) {
                state.byId[widgetId].options = {
                    ...state.byId[widgetId].options,
                    ...value.options,
                };
            }

            if (value.isVisible !== undefined) {
                state.byId[widgetId].isVisible = value.isVisible;
            }
        },
        removeWidgetDictionary: (
            state: WidgetObjectInfoDictionaryState,
            action: PayloadAction<string>
        ) => {
            const id = action.payload;
            delete state.byId[id];
            state.allIds = state.allIds.filter((x) => x !== id);
        },
        removeBatchWidgetDictionary: (
            state: WidgetObjectInfoDictionaryState,
            action: PayloadAction<string[]>
        ) => {
            const ids = action.payload;
            ids.forEach((x) => delete state.byId[x]);

            const allIds = clone(state.allIds);
            const newAllIds = pull(allIds, ...ids);

            state.allIds = newAllIds;
        },
        overrideWidgetDictionary: (
            state: WidgetObjectInfoDictionaryState,
            action: PayloadAction<WidgetObjectInfoDictionary>
        ) => {
            const widgetDictionary = action.payload;

            state.byId = widgetDictionary;

            state.allIds = Object.keys(widgetDictionary);
        },
    },
});

export const {
    addWidgetDictionary,
    addBatchWidgetDictionary,
    updateWidgetDictionary,
    removeWidgetDictionary,
    removeBatchWidgetDictionary,
    overrideWidgetDictionary,
} = widgetsSlice.actions;

export default widgetsSlice.reducer;
