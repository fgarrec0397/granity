import createWidgetReducer from "@app/Widgets/_actions/utilities/createWidgetReducer";
import { PayloadAction } from "@reduxjs/toolkit";

export interface WidgetStarterState {
    widgetStarterMessage: string;
}

const initialState: WidgetStarterState = {
    widgetStarterMessage: "",
};

export const widgetStarterSlice = createWidgetReducer({
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
