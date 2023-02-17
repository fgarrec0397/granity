import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface WidgetStarter2State {
    widgetStarter2Message: string;
}

const initialState: WidgetStarter2State = {
    widgetStarter2Message: "",
};

export const widgetStarter2Slice = createSlice({
    name: "widgetStarter2",
    initialState,
    reducers: {
        addYourWidgetAction: (state, action: PayloadAction<string>) => {
            state.widgetStarter2Message = action.payload;
        },
    },
});

export const { addYourWidgetAction } = widgetStarter2Slice.actions;

export default widgetStarter2Slice;
