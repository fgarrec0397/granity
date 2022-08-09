import {
    widgetsInitialState,
    widgetsReducerActions,
} from "@app/Widgets/_actions/_data/state/widgetsReducer";
import { createSlice } from "@reduxjs/toolkit";

export const sceneSlice = createSlice({
    name: "game",
    initialState: widgetsInitialState,
    reducers: { ...widgetsReducerActions() },
});

export const {
    addWidgetDictionary,
    addBatchWidgetDictionary,
    updateWidgetDictionary,
    removeWidgetDictionary,
} = sceneSlice.actions;

export default sceneSlice.reducer;
