import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ScenesDictionary, ScenesDictionaryItem } from "../../scenesTypes";

export interface ScenesState {
    scenes: ScenesDictionary | null;
    currentSceneId: string | null;
    currentDefaultSceneId: string | null;
}

const initialState: ScenesState = {
    scenes: null,
    currentSceneId: null,
    currentDefaultSceneId: null,
};

export const scenesSlice = createSlice({
    name: "scenes",
    initialState,
    reducers: {
        addScene: (state: ScenesState, actions: PayloadAction<ScenesDictionaryItem>) => {
            const newScene = actions.payload;

            state.scenes = {
                ...state.scenes,
                [newScene.id]: newScene,
            };
        },
        addScenesBatch: (state: ScenesState, actions: PayloadAction<ScenesDictionary>) => {
            const newScenes = actions.payload;

            state.scenes = {
                ...state.scenes,
                ...newScenes,
            };
        },
        resetScenes: (
            state: ScenesState,
            actions: PayloadAction<{ scenes: ScenesDictionary; currentSceneId: string }>
        ) => {
            const { scenes, currentSceneId } = actions.payload;

            state.currentSceneId = currentSceneId;

            state.scenes = {
                ...scenes,
            };
        },
        setCurrentSceneId: (state: ScenesState, actions: PayloadAction<string>) => {
            state.currentSceneId = actions.payload;
        },
        setCurrentDefaultSceneId: (state: ScenesState, actions: PayloadAction<string>) => {
            state.currentDefaultSceneId = actions.payload;
        },
        updateScenes: (state: ScenesState, actions: PayloadAction<ScenesDictionary>) => {
            state.scenes = actions.payload;
        },
        updateScene: (state: ScenesState, actions: PayloadAction<ScenesDictionaryItem>) => {
            const newScene = actions.payload;

            if (state.scenes) {
                state.scenes[newScene.id] = newScene;
            }
        },
        removeScene: (state: ScenesState, actions: PayloadAction<string>) => {
            const sceneId = actions.payload;

            if (state.scenes) {
                delete state.scenes[sceneId];
            }
        },
    },
});

export const {
    addScene,
    addScenesBatch,
    resetScenes,
    setCurrentSceneId,
    setCurrentDefaultSceneId,
    updateScenes,
    updateScene,
    removeScene,
} = scenesSlice.actions;

export default scenesSlice.reducer;
