import { FetchStatus } from "@engine/App/Core/_actions/coreTypes";
import { FilesData } from "@engine/App/Editor/_actions/editorTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { rootFolderName } from "../../editorConstants";

export interface FilesState {
    pathToLoadFiles: string;
    filesData: FilesData;
    status: FetchStatus;
}

const initialState: FilesState = {
    pathToLoadFiles: rootFolderName,
    filesData: {
        currentRootPath: "",
        files: [],
        folders: [],
    },
    status: "loading",
};

export const filesSlice = createSlice({
    name: "files",
    initialState,
    reducers: {
        setPathToLoadFiles: (state: FilesState, actions: PayloadAction<string>) => {
            state.pathToLoadFiles = actions.payload;
        },
        setFilesData: (state: FilesState, actions: PayloadAction<FilesData>) => {
            state.filesData = actions.payload;
        },
        setStatus: (state: FilesState, actions: PayloadAction<FetchStatus>) => {
            state.status = actions.payload;
        },
    },
});

export const { setPathToLoadFiles, setFilesData, setStatus } = filesSlice.actions;

export default filesSlice.reducer;
