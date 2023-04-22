import { FetchStatus } from "@engine/App/Core/_actions/coreTypes";
import { FilesData } from "@engine/App/Editor/_actions/editorTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface FilesState {
    pathToLoad: string;
    filesData: FilesData;
    status: FetchStatus;
}

const initialState: FilesState = {
    pathToLoad: "assets",
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
        setPathToLoad: (state: FilesState, actions: PayloadAction<string>) => {
            state.pathToLoad = actions.payload;
        },
        setFilesData: (state: FilesState, actions: PayloadAction<FilesData>) => {
            state.filesData = actions.payload;
        },
        setStatus: (state: FilesState, actions: PayloadAction<FetchStatus>) => {
            state.status = actions.payload;
        },
    },
});

export const { setPathToLoad, setFilesData, setStatus } = filesSlice.actions;

export default filesSlice.reducer;
