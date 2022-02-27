import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ModesAvailable, SceneElement } from "./types";

export interface EditorState {
    isEditor: boolean;
    hasEditorOpened: boolean;
    isEditing: boolean;
    isMultipleSelect: boolean;
    selected: string[];
    currentMode: ModesAvailable;
    elementsOnScene: SceneElement[];
}

const initialState: EditorState = {
    isEditor: true,
    hasEditorOpened: false,
    isEditing: false,
    isMultipleSelect: false,
    currentMode: ModesAvailable.Translate,
    elementsOnScene: [],
    selected: [],
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
        setIsMultipleSelect: (state, action: PayloadAction<boolean>) => {
            state.isMultipleSelect = action.payload;
        },
        setCurrentMode: (state, action: PayloadAction<ModesAvailable>) => {
            state.currentMode = action.payload;
        },
        addElementOnScene: (state, action: PayloadAction<SceneElement>) => {
            state.elementsOnScene = [...state.elementsOnScene, action.payload];
        },
        setElementsOnScene: (state, action: PayloadAction<SceneElement[]>) => {
            state.elementsOnScene = action.payload;
        },
        removeSelected: (state) => {
            state.selected = [];
        },
        setSelected: (
            state,
            action: PayloadAction<{ newSelectedId: string; isMultipleSelect?: boolean }>
        ) => {
            const newSelectedIdArray = action.payload.isMultipleSelect
                ? [...state.selected, action.payload.newSelectedId]
                : [action.payload.newSelectedId];
            state.selected = newSelectedIdArray;
        },
    },
});

export const {
    setIsEditor,
    setIsEditing,
    setHasEditorOpened,
    setIsMultipleSelect,
    setCurrentMode,
    addElementOnScene,
    setElementsOnScene,
    setSelected,
    removeSelected,
} = sceneSlice.actions;

export default sceneSlice.reducer;
