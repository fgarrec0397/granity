import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WidgetSceneObject } from "../../Widgets/types";
import { ModesAvailable } from "./types";

export interface EditorState {
    isEditor: boolean;
    hasEditorOpened: boolean;
    isEditing: boolean;
    isMultipleSelect: boolean;
    selected: string[];
    currentMode: ModesAvailable;
    currentWidget: WidgetSceneObject | null;
}

const initialState: EditorState = {
    isEditor: true,
    hasEditorOpened: false,
    isEditing: false,
    isMultipleSelect: false,
    currentMode: ModesAvailable.Translate,
    selected: [],
    currentWidget: null,
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
        setCurrentWidget: (state, action: PayloadAction<WidgetSceneObject>) => {
            state.currentWidget = action.payload;
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
    setSelected,
    removeSelected,
    setCurrentWidget,
} = sceneSlice.actions;

export default sceneSlice.reducer;
