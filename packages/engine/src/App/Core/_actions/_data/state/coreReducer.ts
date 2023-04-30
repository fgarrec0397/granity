import { App } from "@engine/App/Core/_actions/coreTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CoreState {
    app: App | null;
}

const initialState: CoreState = {
    app: null,
};

export const coreSlice = createSlice({
    name: "core",
    initialState,
    reducers: {
        setApp: (state: CoreState, actions: PayloadAction<App>) => {
            state.app = actions.payload;
        },
    },
});

export const { setApp } = coreSlice.actions;

export default coreSlice.reducer;
