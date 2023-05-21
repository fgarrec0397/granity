import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { EditorModesAvailable, EditorStatus } from "../../editorConstants";

export interface EditorState {
    editorStatus: EditorStatus;
    hasEditorOpened: boolean;
    hasEdited: boolean;
    isEditing: boolean;
    isMultipleSelect: boolean;
    isDebugEnabled: boolean;
    currentMode: EditorModesAvailable;
}

const initialState: EditorState = {
    editorStatus: EditorStatus.IsEditor,
    hasEditorOpened: false,
    hasEdited: false,
    isEditing: false,
    isMultipleSelect: false,
    isDebugEnabled: false,
    currentMode: EditorModesAvailable.Translate,
};

export const editorSlice = createSlice({
    name: "editor",
    initialState,
    reducers: {
        setEditorStatus: (state: EditorState, actions: PayloadAction<EditorStatus>) => {
            state.editorStatus = actions.payload;
        },
        setIsEditing: (state: EditorState, action: PayloadAction<boolean>) => {
            state.isEditing = action.payload;
        },
        setHasEditorOpened: (state: EditorState) => {
            state.hasEditorOpened = !(state.editorStatus === EditorStatus.IsEditor);
        },
        setHasEdited: (state: EditorState, actions: PayloadAction<boolean>) => {
            state.hasEdited = actions.payload;
        },
        setIsMultipleSelect: (state: EditorState, action: PayloadAction<boolean>) => {
            state.isMultipleSelect = action.payload;
        },
        setIsDebugEnabled: (state: EditorState, action: PayloadAction<boolean>) => {
            state.isDebugEnabled = action.payload;
        },
        setCurrentMode: (state: EditorState, action: PayloadAction<EditorModesAvailable>) => {
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
    setIsDebugEnabled,
    setCurrentMode,
} = editorSlice.actions;

export default editorSlice.reducer;
