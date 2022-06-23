import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ModesAvailable } from "@app/Editor/_actions/editorTypes";

export interface EditorState {
    isEditor: boolean;
    hasEditorOpened: boolean;
    isEditing: boolean;
    isMultipleSelect: boolean;
    currentMode: ModesAvailable;
}

const initialState: EditorState = {
    isEditor: true,
    hasEditorOpened: false,
    isEditing: false,
    isMultipleSelect: false,
    currentMode: ModesAvailable.Translate,
};

export const sceneSlice = createSlice({
    name: "editor",
    initialState,
    reducers: {
        setIsEditor: (state: EditorState) => {
            state.isEditor = !state.isEditor;
        },
        setIsEditing: (state: EditorState, action: PayloadAction<boolean>) => {
            state.isEditing = action.payload;
        },
        setHasEditorOpened: (state: EditorState) => {
            state.isEditing = !state.isEditor;
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
    setHasEditorOpened,
    setIsMultipleSelect,
    setCurrentMode,
} = sceneSlice.actions;

export default sceneSlice.reducer;
