import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { EditorModesAvailable, EditorStatus } from "../../editorConstants";

export interface EditorUtilsState {
    editorStatus: EditorStatus;
    hasEditorOpened: boolean;
    hasEdited: boolean;
    isEditing: boolean;
    isMultipleSelect: boolean;
    isGridEnabled: boolean;
    currentMode: EditorModesAvailable;
}

const initialState: EditorUtilsState = {
    editorStatus: EditorStatus.IsEditor,
    hasEditorOpened: false,
    hasEdited: false,
    isEditing: false,
    isMultipleSelect: false,
    isGridEnabled: false,
    currentMode: EditorModesAvailable.Translate,
};

export const editorSlice = createSlice({
    name: "editor",
    initialState,
    reducers: {
        setEditorStatus: (state: EditorUtilsState, actions: PayloadAction<EditorStatus>) => {
            state.editorStatus = actions.payload;
        },
        setIsEditing: (state: EditorUtilsState, action: PayloadAction<boolean>) => {
            state.isEditing = action.payload;
        },
        setHasEditorOpened: (state: EditorUtilsState) => {
            state.hasEditorOpened = !(state.editorStatus === EditorStatus.IsEditor);
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
        setCurrentMode: (state: EditorUtilsState, action: PayloadAction<EditorModesAvailable>) => {
            state.currentMode = action.payload;
        },
    },
});

export const {
    setEditorStatus,
    setIsEditing,
    setHasEditorOpened,
    setHasEdited,
    setIsMultipleSelect,
    setIsGridEnabled,
    setCurrentMode,
} = editorSlice.actions;

export default editorSlice.reducer;
