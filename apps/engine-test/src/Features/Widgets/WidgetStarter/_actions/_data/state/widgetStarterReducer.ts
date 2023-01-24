import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface WidgetStarterState {
    widgetStarterMessage: string;
}

const initialState: WidgetStarterState = {
    widgetStarterMessage: "",
};

export const widgetStarterSlice = createSlice({
    name: "widgetStarter",
    initialState,
    reducers: {
        addYourWidgetAction: (state, action: PayloadAction<string>) => {
            state.widgetStarterMessage = action.payload;
        },
    },
});

export const { addYourWidgetAction } = widgetStarterSlice.actions;

export default widgetStarterSlice;
