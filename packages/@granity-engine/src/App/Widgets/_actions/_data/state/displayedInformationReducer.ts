import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { WidgetProperties } from "../../widgetsTypes";

export interface DisplayedInformationsState {
    currentWidgetProperties: WidgetProperties | null;
}

export const displayedInformationsInitialState: DisplayedInformationsState = {
    currentWidgetProperties: null,
};

export const displayedInformationsSlice = createSlice({
    name: "displayedInformations",
    initialState: displayedInformationsInitialState,
    reducers: {
        setCurrentWidgetProperties: (
            state: DisplayedInformationsState,
            action: PayloadAction<WidgetProperties>
        ) => {
            state.currentWidgetProperties = action.payload;
        },
    },
});

export const { setCurrentWidgetProperties } = displayedInformationsSlice.actions;

export default displayedInformationsSlice.reducer;
