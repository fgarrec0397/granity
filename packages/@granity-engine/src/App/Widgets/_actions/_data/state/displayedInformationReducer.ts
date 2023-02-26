import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { WidgetProperties } from "../../widgetsTypes";

export interface DisplayedInformationsState {
    propertiesUI: WidgetProperties | null;
}

export const displayedInformationsInitialState: DisplayedInformationsState = {
    propertiesUI: null,
};

export const displayedInformationsSlice = createSlice({
    name: "displayedInformations",
    initialState: displayedInformationsInitialState,
    reducers: {
        setPropertiesUI: (
            state: DisplayedInformationsState,
            action: PayloadAction<WidgetProperties>
        ) => {
            state.propertiesUI = action.payload;
        },
    },
});

export const { setPropertiesUI } = displayedInformationsSlice.actions;

export default displayedInformationsSlice.reducer;
