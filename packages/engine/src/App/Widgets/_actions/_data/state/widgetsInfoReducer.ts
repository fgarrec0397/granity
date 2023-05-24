import { clone, pull } from "@granity/helpers";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
    WidgetInfoDictionary,
    WidgetInfoDictionaryItem,
    WidgetOptionsValues,
} from "../../widgetsTypes";
import { UpdateWidgetParameter } from "../widgetsServiceParameters";

export interface WidgetsInfoState {
    byId: WidgetInfoDictionary;
    allIds: string[];
}

export const widgetsInfoInitialState: WidgetsInfoState = {
    byId: {},
    allIds: [],
};

export const widgetsInfoSlice = createSlice({
    name: "widgetsInfo",
    initialState: widgetsInfoInitialState,
    reducers: {
        addWidgetInfoDictionaryItem: <
            WidgetInfoDictionaryItemType extends WidgetInfoDictionaryItem
        >(
            state: WidgetsInfoState,
            action: PayloadAction<WidgetInfoDictionaryItemType>
        ) => {
            const widgetObjectInfo = action.payload;

            state.byId = {
                ...state.byId,
                [widgetObjectInfo.id]: widgetObjectInfo,
            };

            state.allIds.push(widgetObjectInfo.id);
        },
        addBatchWidgetInfoDictionary: (
            state: WidgetsInfoState,
            action: PayloadAction<Required<WidgetInfoDictionary>>
        ) => {
            const newWidgetsDictionary = action.payload;

            state.byId = {
                ...state.byId,
                ...newWidgetsDictionary,
            };

            state.allIds = [...state.allIds, ...Object.keys(newWidgetsDictionary)];
        },
        updateWidgetInfoDictionaryItem: <TValue = string>(
            state: WidgetsInfoState,
            action: PayloadAction<{
                widgetId: string;
                value: UpdateWidgetParameter<TValue>;
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
                    ...(value.options as WidgetOptionsValues<any>),
                };
            }

            if (value.isVisible !== undefined) {
                state.byId[widgetId].isVisible = value.isVisible;
            }
        },
        removeWidgetInfoDictionaryItem: (
            state: WidgetsInfoState,
            action: PayloadAction<string>
        ) => {
            const id = action.payload;
            delete state.byId[id];
            state.allIds = state.allIds.filter((x) => x !== id);
        },
        removeBatchWidgetInfoDictionary: (
            state: WidgetsInfoState,
            action: PayloadAction<string[]>
        ) => {
            const ids = action.payload;
            ids.forEach((x) => delete state.byId[x]);

            const allIds = clone(state.allIds);
            const newAllIds = pull(allIds, ...ids);

            state.allIds = newAllIds;
        },
        overrideWidgetInfoDictionary: (
            state: WidgetsInfoState,
            action: PayloadAction<WidgetInfoDictionary>
        ) => {
            const widgetDictionary = action.payload;

            state.byId = widgetDictionary;

            state.allIds = Object.keys(widgetDictionary);
        },
    },
});

export const {
    addWidgetInfoDictionaryItem,
    addBatchWidgetInfoDictionary,
    updateWidgetInfoDictionaryItem,
    removeWidgetInfoDictionaryItem,
    removeBatchWidgetInfoDictionary,
    overrideWidgetInfoDictionary,
} = widgetsInfoSlice.actions;

export default widgetsInfoSlice.reducer;
