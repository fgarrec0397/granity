import { WidgetProperties } from "@engine/App/Widgets/_actions/widgetsTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UIState {
    selectedWidgetProperties: WidgetProperties | null;
}

export const uiState: UIState = {
    selectedWidgetProperties: null,
};

export const uiSlice = createSlice({
    name: "ui",
    initialState: uiState,
    reducers: {
        setSelectedWidgetProperties: (state: UIState, action: PayloadAction<WidgetProperties>) => {
            state.selectedWidgetProperties = action.payload;
        },
    },
});

export const { setSelectedWidgetProperties } = uiSlice.actions;

export default uiSlice.reducer;
