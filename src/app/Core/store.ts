import { configureStore } from "@reduxjs/toolkit";
import editorReducer from "../Editor/state/editorReducer";

export const store = configureStore({
    reducer: {
        editor: editorReducer,
    },
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
