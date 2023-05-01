import { FetchStatus } from "@engine/App/Core/_actions/coreTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ScenesDictionary, ScenesDictionaryItem } from "../../scenesTypes";

export interface ScenesState {
    byId: ScenesDictionary;
    allIds: string[];
    status: FetchStatus;
    currentSceneId: string | null;
    currentDefaultSceneId: string | null;
}

const initialState: ScenesState = {
    byId: {},
    allIds: [],
    status: "loading",
    currentSceneId: null,
    currentDefaultSceneId: null,
};

export const scenesSlice = createSlice({
    name: "scenes",
    initialState,
    reducers: {
        addScene: (state: ScenesState, actions: PayloadAction<ScenesDictionaryItem>) => {
            const newScene = actions.payload;

            state.byId = {
                ...state.byId,
                [newScene.id]: newScene,
            };

            state.allIds.push(newScene.id);
        },
        setScenesStatus: (state: ScenesState, actions: PayloadAction<ScenesState["status"]>) => {
            const status = actions.payload;

            state.status = status;
        },
        addScenesBatch: (state: ScenesState, actions: PayloadAction<ScenesDictionary>) => {
            const newScenes = actions.payload;

            state.byId = {
                ...state.byId,
                ...newScenes,
            };

            state.allIds = [...state.allIds, ...Object.keys(newScenes)];
        },
        resetScenes: (
            state: ScenesState,
            actions: PayloadAction<{ scenes: ScenesDictionary; currentSceneId: string }>
        ) => {
            const { scenes, currentSceneId } = actions.payload;

            state.currentSceneId = currentSceneId;

            state.byId = scenes;

            state.allIds = Object.keys(scenes);
        },
        setCurrentSceneId: (state: ScenesState, actions: PayloadAction<string>) => {
            state.currentSceneId = actions.payload;
        },
        setCurrentDefaultSceneId: (state: ScenesState, actions: PayloadAction<string>) => {
            state.currentDefaultSceneId = actions.payload;
        },
        updateScenes: (state: ScenesState, actions: PayloadAction<ScenesDictionary>) => {
            state.byId = actions.payload;
        },
        updateScene: (state: ScenesState, actions: PayloadAction<ScenesDictionaryItem>) => {
            const newScene = actions.payload;

            if (state.byId) {
                state.byId[newScene.id] = newScene;
            }
        },
        removeScene: (state: ScenesState, actions: PayloadAction<string>) => {
            const sceneId = actions.payload;

            if (state.byId) {
                delete state.byId[sceneId];
            }

            state.allIds = state.allIds.filter((x) => x !== sceneId);
        },
    },
});

export const {
    addScene,
    setScenesStatus,
    addScenesBatch,
    resetScenes,
    setCurrentSceneId,
    setCurrentDefaultSceneId,
    updateScenes,
    updateScene,
    removeScene,
} = scenesSlice.actions;

export default scenesSlice.reducer;
