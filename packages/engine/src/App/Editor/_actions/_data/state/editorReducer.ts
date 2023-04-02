import { FilesData, ModesAvailable } from "@engine/App/Editor/_actions/editorTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface EditorState {
    isEditor: boolean;
    hasEditorOpened: boolean;
    hasEdited: boolean;
    isEditing: boolean;
    isGameUIPreview: boolean;
    isMultipleSelect: boolean;
    isGridEnabled: boolean;
    currentMode: ModesAvailable;
    filesData?: FilesData;
}

const initialState: EditorState = {
    isEditor: true,
    hasEditorOpened: false,
    hasEdited: false,
    isEditing: false,
    isGameUIPreview: false,
    isMultipleSelect: false,
    isGridEnabled: false,
    currentMode: ModesAvailable.Translate,
    filesData: undefined,
};

export const editorSlice = createSlice({
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
        setIsGridEnabled: (state: EditorState, action: PayloadAction<boolean>) => {
            state.isGridEnabled = action.payload;
        },
        setCurrentMode: (state: EditorState, action: PayloadAction<ModesAvailable>) => {
            state.currentMode = action.payload;
        },
        setFilesData: (state: EditorState, actions: PayloadAction<FilesData>) => {
            state.filesData = actions.payload;
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
    setFilesData,
} = editorSlice.actions;

export default editorSlice.reducer;
