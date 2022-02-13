import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ModesAvailable, SceneElementInformations } from "./types";

export interface EditorState {
    isEditor: boolean;
    hasEditorOpened: boolean;
    isEditing: boolean;
    currentMode: ModesAvailable;
    currentElement: SceneElementInformations | null;
    elementsOnScene: SceneElementInformations[] | [];
}

const initialState: EditorState = {
    isEditor: false,
    hasEditorOpened: false,
    isEditing: false,
    currentMode: ModesAvailable.Translate,
    currentElement: null,
    elementsOnScene: [],
};

export const sceneSlice = createSlice({
    name: "editor",
    initialState,
    reducers: {
        setIsEditor: (state) => {
            state.isEditor = !state.isEditor;
        },
        setIsEditing: (state, action: PayloadAction<boolean>) => {
            state.isEditing = action.payload;
        },
        setHasEditorOpened: (state) => {
            state.isEditing = !state.isEditor;
        },
        setCurrentMode: (state, action: PayloadAction<ModesAvailable>) => {
            state.currentMode = action.payload;
        },
        setCurrentElement: (
            state,
            action: PayloadAction<SceneElementInformations>
        ) => {
            state.currentElement = action.payload;
        },
        setElementsOnScene: (
            state,
            action: PayloadAction<SceneElementInformations[]>
        ) => {
            state.elementsOnScene = action.payload;
        },
    },
});

export const {
    setIsEditor,
    setIsEditing,
    setHasEditorOpened,
    setCurrentMode,
    setCurrentElement,
    setElementsOnScene,
} = sceneSlice.actions;

export default sceneSlice.reducer;
