import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { WidgetModule } from "../../widgetsTypes";

export interface WidgetsModulesState {
    widgetsModules: WidgetModule[];
}

export const widgetsModulesInitialState: WidgetsModulesState = {
    widgetsModules: [],
};

export const widgetsModulesSlice = createSlice({
    name: "widgetsModule",
    initialState: widgetsModulesInitialState,
    reducers: {
        addWidgetModule: (state: WidgetsModulesState, action: PayloadAction<WidgetModule>) => {
            state.widgetsModules = [...state.widgetsModules, action.payload];
        },
    },
});

export const { addWidgetModule } = widgetsModulesSlice.actions;

export default widgetsModulesSlice.reducer;
