import { App, FetchStatus } from "@engine/App/Core/_actions/coreTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CoreState {
    app: App | null;
    status: FetchStatus;
}

const initialState: CoreState = {
    app: null,
    status: "loading",
};

export const coreSlice = createSlice({
    name: "core",
    initialState,
    reducers: {
        setApp: (state: CoreState, actions: PayloadAction<CoreState["app"]>) => {
            state.app = actions.payload;
        },
        setStatus: (state: CoreState, actions: PayloadAction<CoreState["status"]>) => {
            const status = actions.payload;

            state.status = status;
        },
    },
});

export const { setApp, setStatus } = coreSlice.actions;

export default coreSlice.reducer;
