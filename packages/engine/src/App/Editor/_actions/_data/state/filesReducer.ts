import { FetchStatus } from "@engine/App/Core/_actions/coreTypes";
import { FilesData } from "@engine/App/Editor/_actions/editorTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface FilesState {
    filesData: FilesData;
    status: FetchStatus;
}

const initialState: FilesState = {
    filesData: {
        currentRootPath: "assets",
        files: [],
        folders: [],
    },
    status: "isLoading",
};

export const filesSlice = createSlice({
    name: "files",
    initialState,
    reducers: {
        setFilesData: (state: FilesState, actions: PayloadAction<FilesData>) => {
            state.filesData = actions.payload;
        },
        setStatus: (state: FilesState, actions: PayloadAction<FetchStatus>) => {
            state.status = actions.payload;
        },
    },
});

export const { setFilesData, setStatus } = filesSlice.actions;

export default filesSlice.reducer;
