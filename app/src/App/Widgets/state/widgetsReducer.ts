import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WidgetProperties, WidgetsDictionary, WidgetsDictionaryItem } from "@widgets/widgetsTypes";

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
        setCurrentWidgetProperties: (
            state: WidgetsState,
            action: PayloadAction<WidgetProperties>
        ) => {
            state.currentWidgetProperties = action.payload;
        },
        addWidgetDictionary: (
            state: WidgetsState,
            action: PayloadAction<Required<WidgetsDictionaryItem>>
        ) => {
            const { id, properties, options } = action.payload;

            state.widgetsDictionary = {
                ...state.widgetsDictionary,
                [id]: { properties, options },
            };
        },
        addBatchWidgetDictionary: (
            state: WidgetsState,
            action: PayloadAction<Required<WidgetsDictionary>>
        ) => {
            const newWidgetsDictionary = action.payload;

            state.widgetsDictionary = {
                ...state.widgetsDictionary,
                ...newWidgetsDictionary,
            };
        },
        updateWidgetDictionary: (
            state: WidgetsState,
            action: PayloadAction<WidgetsDictionaryItem>
        ) => {
            const { id, properties, options } = action.payload;

            if (properties) {
                state.widgetsDictionary[id].properties = properties;
            }

            if (options) {
                state.widgetsDictionary[id].options = options;
            }
        },
        removeWidgetDictionary: (state: WidgetsState, action: PayloadAction<string>) => {
            const id = action.payload;
            delete state.widgetsDictionary[id];
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
    },
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
