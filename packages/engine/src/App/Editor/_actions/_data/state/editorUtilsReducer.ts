import { ModesAvailable } from "@engine/App/Editor/_actions/editorTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface EditorUtilsState {
    isEditor: boolean;
    hasEditorOpened: boolean;
    hasEdited: boolean;
    isEditing: boolean;
    isGameUIPreview: boolean;
    isMultipleSelect: boolean;
    isGridEnabled: boolean;
    currentMode: ModesAvailable;
}

const initialState: EditorUtilsState = {
    isEditor: true,
    hasEditorOpened: false,
    hasEdited: false,
    isEditing: false,
    isGameUIPreview: false,
    isMultipleSelect: false,
    isGridEnabled: false,
    currentMode: ModesAvailable.Translate,
};

export const editorSlice = createSlice({
    name: "editor",
    initialState,
    reducers: {
        setIsEditor: (state: EditorUtilsState, actions: PayloadAction<boolean>) => {
            state.isEditor = actions.payload;
        },
        setIsEditing: (state: EditorUtilsState, action: PayloadAction<boolean>) => {
            state.isEditing = action.payload;
        },
        setIsGameUIPreview: (state: EditorUtilsState, action: PayloadAction<boolean>) => {
            state.isGameUIPreview = action.payload;
        },
        setHasEditorOpened: (state: EditorUtilsState) => {
            state.isEditing = !state.isEditor;
        },
        setHasEdited: (state: EditorUtilsState, actions: PayloadAction<boolean>) => {
            state.hasEdited = actions.payload;
        },
        setIsMultipleSelect: (state: EditorUtilsState, action: PayloadAction<boolean>) => {
            state.isMultipleSelect = action.payload;
        },
        setIsGridEnabled: (state: EditorUtilsState, action: PayloadAction<boolean>) => {
            state.isGridEnabled = action.payload;
        },
        setCurrentMode: (state: EditorUtilsState, action: PayloadAction<ModesAvailable>) => {
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
    setIsGridEnabled,
    setCurrentMode,
} = editorSlice.actions;

export default editorSlice.reducer;
