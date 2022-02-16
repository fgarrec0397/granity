import { configureStore } from "@reduxjs/toolkit";
import sceneReducer from "../Scene/state/sceneReducer";
import editorReducer from "../Scene/_Editor/state/editorReducer";

export const store = configureStore({
    reducer: {
        scene: sceneReducer,
        editor: editorReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // Todo - Temporary
        }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
