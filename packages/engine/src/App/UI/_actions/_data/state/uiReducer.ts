import { GameWidgetProperties } from "@engine/App/Game/_actions/gameTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UIState {
    selectedWidgetProperties: GameWidgetProperties | null;
}

export const uiState: UIState = {
    selectedWidgetProperties: null,
};

export const uiSlice = createSlice({
    name: "ui",
    initialState: uiState,
    reducers: {
        setSelectedWidgetProperties: (
            state: UIState,
            action: PayloadAction<GameWidgetProperties>
        ) => {
            state.selectedWidgetProperties = action.payload;
        },
    },
});

export const { setSelectedWidgetProperties } = uiSlice.actions;

export default uiSlice.reducer;
