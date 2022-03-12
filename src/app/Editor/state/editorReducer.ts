import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IEditableProxy } from "./EditableProxyProvider";
import { ModesAvailable } from "./types";

type PlainEditableProxy = Omit<IEditableProxy, "object">;
// type CurrentEditableProxyProperties = Pick<IEditableProxy, "position" | "rotation" | "scale">;

export interface EditorState {
    isEditor: boolean;
    hasEditorOpened: boolean;
    isEditing: boolean;
    isMultipleSelect: boolean;
    selected: string[];
    currentMode: ModesAvailable;
    currentProxy: PlainEditableProxy | null;
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
} = sceneSlice.actions;

export default sceneSlice.reducer;
