import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IWidget } from "../../Core/_Widgets/typings";
import { IEditableProxy } from "./EditableProxyProvider";
import { ModesAvailable } from "./types";

type PlainEditableProxy = Omit<IEditableProxy, "object">;
type PlainWidget = Omit<IWidget, "component">;

export interface EditorState {
    isEditor: boolean;
    hasEditorOpened: boolean;
    isEditing: boolean;
    isMultipleSelect: boolean;
    selected: string[];
    currentMode: ModesAvailable;
    currentProxy: PlainEditableProxy | null;
    currentWidget: PlainWidget | null;
}

const initialState: EditorState = {
    isEditor: true,
    hasEditorOpened: false,
    isEditing: false,
    isMultipleSelect: false,
    currentMode: ModesAvailable.Translate,
    selected: [],
    // TODO -- setup interface with this object in the state
    currentProxy: null,
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
        setCurrentProxy: (state, action: PayloadAction<PlainEditableProxy>) => {
            state.currentProxy = action.payload;
        },
        setCurrentWidget: (state, action: PayloadAction<PlainWidget>) => {
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
    setCurrentProxy,
    removeSelected,
    setCurrentWidget,
} = sceneSlice.actions;

export default sceneSlice.reducer;
