import { ModesAvailable } from "@granity-engine/App/Editor/_actions/editorTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface EditorState {
    isEditor: boolean;
    hasEditorOpened: boolean;
    hasEdited: boolean;
    isEditing: boolean;
    isGameUIPreview: boolean;
    isMultipleSelect: boolean;
    currentMode: ModesAvailable;
}

const initialState: EditorState = {
    isEditor: true,
    hasEditorOpened: false,
    hasEdited: false,
    isEditing: false,
    isGameUIPreview: false,
    isMultipleSelect: false,
    currentMode: ModesAvailable.Translate,
};

export const sceneSlice = createSlice({
    name: "editor",
    initialState,
    reducers: {
        setIsEditor: (state: EditorState, actions: PayloadAction<boolean>) => {
            state.isEditor = actions.payload;
        },
        setIsEditing: (state: EditorState, action: PayloadAction<boolean>) => {
            state.isEditing = action.payload;
        },
        setIsGameUIPreview: (state: EditorState, action: PayloadAction<boolean>) => {
            state.isGameUIPreview = action.payload;
        },
        setHasEditorOpened: (state: EditorState) => {
            state.isEditing = !state.isEditor;
        },
        setHasEdited: (state: EditorState, actions: PayloadAction<boolean>) => {
            state.hasEdited = actions.payload;
        },
        setIsMultipleSelect: (state: EditorState, action: PayloadAction<boolean>) => {
            state.isMultipleSelect = action.payload;
        },
        setCurrentMode: (state: EditorState, action: PayloadAction<ModesAvailable>) => {
            state.currentMode = action.payload;
        },
    },
});

export const {
    setIsEditor,
    setIsEditing,
    setIsGameUIPreview,
    setHasEditorOpened,
    setHasEdited,
    setIsMultipleSelect,
    setCurrentMode,
} = sceneSlice.actions;

export default sceneSlice.reducer;
